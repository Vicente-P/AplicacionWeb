from pymongo import MongoClient
import gridfs
import tempfile
from fastapi import APIRouter, UploadFile, File, Response
from fastapi.responses import FileResponse
import os
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
from fastapi import FastAPI
import jwt
from fastapi import Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from tortoise import fields 
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model

#auth imports
import time
from typing import Dict
import jwt
from decouple import config
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

#JWT Config

JWT_SECRET = "Wxz8EGmTQ6uXW5dE"
JWT_ALGORITHM = "HS256"

#Config
client = MongoClient('mongodb://localhost:27017/')
fs = gridfs.GridFS(client['archivos'], collection = 'tiffs_collection')

#APP

app = FastAPI()

def token_response(token: str):
    return {
        "access_token": token
    }


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token
    except:
        return {}

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decodeJWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid



#Token

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password_hash = fields.CharField(128)

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)

User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

async def authenticate_user(username: str, password: str):
    user = await User.get(username=username)
    if not user:
        return False 
    if not user.verify_password(password):
        return False
    return user 

@app.post('/token')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )

    user_obj = await User_Pydantic.from_tortoise_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return {'access_token' : token, 'token_type' : 'bearer'}


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = await User.get(id=payload.get('id'))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )

    return await User_Pydantic.from_tortoise_orm(user)


@app.post('/users', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = User(username=user.username, password_hash=bcrypt.hash(user.password_hash))
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)

@app.get('/users/me', response_model=User_Pydantic)
async def get_user(user: User_Pydantic = Depends(get_current_user)):
    return user    

register_tortoise(
    app, 
    db_url='sqlite://db.sqlite3',
    modules={'models': ['Archivos']},
    generate_schemas=True,
    add_exception_handlers=True
)


#Routes

archivos = APIRouter()

ALLOWED_EXTENSIONS = ['.tif', '.tiff']

def allowed_file(filename):
    ext = os.path.splitext(filename)[1]
    return ext.lower() in ALLOWED_EXTENSIONS

@archivos.get("/files",dependencies=[Depends(JWTBearer())])
def find_all_files():
    return geotiffsEntity(client.archivos.tiffs_collection.files.find())


@archivos.get("/files/{id}",dependencies=[Depends(JWTBearer())])
def find_file(id: str):
    return geotiffEntity(client.archivos.tiffs_collection.files.find_one({"_id": ObjectId(id)}))

@archivos.post("/upload_files",dependencies=[Depends(JWTBearer())])
async def upload_file(archivo: UploadFile = File(...)):
    if not allowed_file(archivo.filename):
        return {'error': 'Solo se permiten archivos GeoTIFF (.tif, .tiff)'}
    contenido = await archivo.read()
    archivo_id = fs.put(contenido, filename=archivo.filename)
    return Response(status_code=HTTP_204_NO_CONTENT)

@archivos.get("/download_files/",dependencies=[Depends(JWTBearer())])
async def download_file(filename: str):
    archivo = fs.find_one({'filename': filename})
    if archivo is None:
        return {'error': 'El archivo no existe'}

    # Leer el contenido del archivo desde GridFS
    contenido = archivo.read()

    # Crear un archivo temporal en el sistema de archivos
    with tempfile.NamedTemporaryFile(delete=False, suffix='.tif') as temp_file:
        temp_file.write(contenido)

    return FileResponse(temp_file.name, media_type='image/tiff', filename= archivo.filename)

#Schema

@archivos.get('/search_file',dependencies=[Depends(JWTBearer())])
async def search_file(filename: str):
    archivo = fs.find_one({'filename': filename})
    if archivo is None:
        return {'error': 'El archivo no existe'}
    return geotiffEntity(client.archivos.tiffs_collection.files.find_one({"_id": archivo._id}))



def geotiffEntity(item)-> dict:
    return {
        "id": str(item["_id"]),
        "Filename": item["filename"],
        "chunkSize": item["chunkSize"],
        "length": item["length"],
        "uploadDate": item["uploadDate"]
    }


def geotiffsEntity(entity)-> list:
    return [geotiffEntity(item) for item in entity]


#APP

app.include_router(archivos)
