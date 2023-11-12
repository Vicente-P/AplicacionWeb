import React, { useState } from 'react';
import '../../App.css';

export default function Coordenada() {
  async function searchCoordinates() {
    const lat = document.getElementById('latitud');
    const lon = document.getElementById('longitud');
    const querylat = lat.value;
    const querylon = lon.value;
    try {
      const response = await fetch(`http://18.222.116.56:8080/search_coordinates/${querylat}/${querylon}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJWaWNlbnRlIiwicGFzc3dvcmRfaGFzaCI6IiQyYiQxMiQxRGZjSGF2RmgwdG1HR3hjdS5lM1VlaDI4M1NqeGt4YjNQbnQxTEd1OVhKdFU2LnlXcnVLNiJ9.O3GYZ9V2pO3Qx3N4y-HYOM6YwaCZf-YiMhGXJ0ajotg`
        }
      });

      const data = await response.text();
      const listaArchivosElement = document.getElementById('listaArchivos');
      const li = document.createElement('a');
      li.classList.add('list-group');
      li.classList.add('btn'); // Agregar clase list-group-item de Bootstrap
	  li.classList.add('btn-dark');
	  li.classList.add('mt-1');
    console.log(data)
      if(data.includes(".tif")){ //Si encontro el archivo
      	listaArchivosElement.innerHTML = '';
        li.textContent = data.replaceAll('"', '');
      	listaArchivosElement.appendChild(li);
      	li.setAttribute('href', 'http://18.224.14.85:8080/download_files?filename='+li.textContent); // Agregar atributo href
    	li.setAttribute('target', '_blank'); // Agregar atributo href
      }else{
      	listaArchivosElement.innerHTML = '';
      	li.textContent = "Archivo no encontrado"
      	listaArchivosElement.appendChild(li);
      }
      

      } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <h1 class='display-2 center'>Buscador de archivos por coordenadas</h1>
      <div class="container">
      <div class="input-group ">
      <input type="text" class="form-control" id="latitud" placeholder="Latitud" />
      <input type="text" class="form-control" id="longitud" placeholder="Longitud" />
      <span class="input-group-btn">
      <button class="btn btn-dark " onClick={() => searchCoordinates()}>Buscar</button>
      </span>
      
      </div>
      <div class="">
      <ul class="list-group" id="listaArchivos"></ul>
      </div>
      </div>
    </>
  );
}
