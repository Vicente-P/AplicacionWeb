const url = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/723d0580-452d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Radon&startTs=1265046352083&endTs=1665029708303"
const url2 = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/101d2fe0-454d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=TIMESTAMP,WS,WD,Temp,RH,BP,Depth &startTs=1265046352083&endTs=1665043961492"
const url3 = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/8c5ad790-454f-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Date,Time,BC1,BC2,BC3,BC4,BC5,BC6,BC7&startTs=1265046352083&endTs=1665044358966"
const url4 = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/6a4dd7a0-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=fecha,hora,BC&startTs=1265046352083&endTs=1665044739122"
const url5 = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/efdd9590-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Hora,Albedo&startTs=1265046352083&endTs=1665044947549"
const url6 = "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/99ce9f80-4557-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,TSP,PM10,PM4,PM2.5,PM1&startTs=1265046352083&endTs=1665048457821"


const readline = require('readline')
const rl = readline.createInterface({input : process.stdin,
                        output: process.stdout});                
const token = fetch("http://18.214.103.65:8080/api/auth/login" , { 
    method: 'POST',
    body: JSON.stringify({
        "username":"alumnos@alumnos.org",
        "password":"m7a/s99"
    }),
    headers: new Headers({
        'Content-Type': 'application/json'        
    })
}).then(response => response.json() )
.then((datos) => {


    rl.question(`Ingrese el numero de la opcion que desea: \n 1) Radon \n 2) multiparametro \n 3) Bc-mangee \n 4) Bc-map \n 5) Radiometro\n 6) MP-grimm \n`,
    (userInput)=> {
        console.log("escogio la opcion: ", userInput)
    
        if(userInput == "1"){
            fetch(url , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization':"Bearer " + datos['token']
                })
            })
            .then(response => response.json() )
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3

                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);
                for (var i = 0; i < data['Fecha'].length; i++){
                    const dateStr = data['Fecha'][i].value;

                    const [fecha] = dateStr.split(' ');
                    var [month, day, year] = fecha.split('/');
                    const date = new Date(20+year, month - 1, +day);
                    if(date >= start && date <= end){
                        console.log("Radon:",data['Radon'][i].value,"Fecha:", data['Fecha'][i].value)
                    }
            
                }
                
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))
            

        }else if (userInput == "2"){
            fetch(url2 , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization': "Bearer " + datos['token']    
                })
            })
            .then(response => response.json() )
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3
                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);
                for (var i = 0; i < data['TIMESTAMP'].length; i++){

                    const dateStr = data['TIMESTAMP'][i].value;
                    const [fecha] = dateStr.split(' ');
                    const date = new Date(fecha);
                    if(date >= start && date <= end){
                        console.log("Temp:", data['Temp'][i].value,"WS:", data['WS'][i].value
                        ,"WD:", data['WD'][i].value,"RH:", data['RH'][i].value,"BP: ", data['BP'][i].value,"TIMESTAMP:",data['TIMESTAMP'][i].value)
                    }
            
                }
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))

        }else if (userInput == "3"){
            fetch(url3 , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization': "Bearer " + datos['token']    
                })
            })
            .then(response => response.json() )
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3
                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);

                for (var i = 0; i < data['Date'].length; i++){
                    const dateStr = data['Date'][i].value;
                    var [year, month, day] = dateStr.split('/');
                    const date = new Date(year, month - 1, +day);
            
                    if(date >= start && date <= end){
                        console.log("Date:",data['Date'][i].value, "Time:", data['Time'][i].value, "BC1:",data['BC1'][i].value, 
                        "BC2:",data['BC2'][i].value, "BC3:",data['BC3'][i].value, "BC4: ",data['BC4'][i].value, "BC5:",data['BC5'][i].value,
                        "BC6:",data['BC6'][i].value, "BC7:",data['BC7'][i].value)
                    }
            
                }
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))

        }else if (userInput == "4"){
            fetch(url4 , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization': "Bearer " + datos['token']    
                })
            })
            .then(response => response.json() )
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3
                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);
                for (var i = 0; i < data['fecha'].length; i++){
                    const dateStr = data['fecha'][i].value;
                    var [year, month, day] = dateStr.split('-');
                    const date = new Date(20+year, month - 1, +day);
                    if(date >= start && date <= end){
                        console.log("Fecha:",data['fecha'][i].value, "Hora:", data['hora'][i].value, "BC:",data['BC'][i].value)
                    }
            
                }
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))
        }else if (userInput == "5"){

            fetch(url5 , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization': "Bearer " + datos['token']    
                })
            })
            .then(response => response.json())
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3
                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);
                for (var i = 0; i < data['Fecha'].length; i++){
                    const dateStr = data['Fecha'][i].value;
                    var [day, month, year] = dateStr.split('/');
                    const date = new Date(year, month - 1, +day);
                    if(date >= start && date <= end){
                        console.log("Fecha:",data['Fecha'][i].value, "Hora:", data['Hora'][i].value,"Albedo:",data['Albedo'][i].value )
                    }
            
                }
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))

        }else if (userInput == "6"){
            fetch(url6 , { 
                method: 'get', 
                headers: new Headers({
                    'X-Authorization': "Bearer " + datos['token']    
                })
            })
            .then(response => response.json())
            .then(data => {
                var fecha_inicio;
                var fecha_termino;
                rl.question(`ingrese fecha de inicio (Formato: YYYY-MM-DD):`,
                (userInput2)=> {fecha_inicio = userInput2
                
                rl.question(`ingrese fecha de termino (Formato: YYYY-MM-DD):`,
                (userInput3)=> {fecha_termino = userInput3
                const start = new Date(fecha_inicio);
                const end = new Date(fecha_termino);
                
                for (var i = 0; i < data['Fecha'].length; i++){
                    const dateStr = data['Fecha'][i].value;
                    const [fecha] = dateStr.split(' ');
                    const date = new Date(fecha);
                    if(date >= start && date <= end){
                        console.log("Fecha:",data['Fecha'][i].value, "TSP:",data['TSP'][i].value, 
                        "PM10:",data['PM10'][i].value, "PM4:",data['PM4'][i].value, "PM2.5:",data['PM2.5'][i].value,
                        "PM1:",data['PM1'][i].value)
                    }
            
                }
                rl.close()
                });
                });
            })
            .catch(err =>console.log(err))
        }
    
    });
    
})