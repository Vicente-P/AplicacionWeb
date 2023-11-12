import React, { useState } from 'react';
import '../../App.css';

export default function Buscador() {
  async function searchFiles() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;
    console.log(searchInput.value)

    try {
      const response = await fetch(`http://18.224.14.85:8080/search_file?filename=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJWaWNlbnRlIiwicGFzc3dvcmRfaGFzaCI6IiQyYiQxMiQxRGZjSGF2RmgwdG1HR3hjdS5lM1VlaDI4M1NqeGt4YjNQbnQxTEd1OVhKdFU2LnlXcnVLNiJ9.O3GYZ9V2pO3Qx3N4y-HYOM6YwaCZf-YiMhGXJ0ajotg`
        }
      });

      const data = await response.json();
      const listaArchivosElement = document.getElementById('listaArchivos');
      const li = document.createElement('li');
      li.classList.add('list-group');
      li.classList.add('btn'); // Agregar clase list-group-item de Bootstrap
	  li.classList.add('btn-dark');
	  li.classList.add('mt-1');
      console.log(data)
      if(data["id"] !== undefined){ //Si no hay error
      	li.textContent = data.Filename;
      	listaArchivosElement.innerHTML = '';
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
      <h1 class='display-2 center'>Buscador de archivos por nombre</h1>
      <div class="container">
      <div class="input-group ">
      <input type="text" class="form-control" id="searchInput" placeholder="Nombre del archivo" />
      <span class="input-group-btn">
      <button class="btn btn-dark " onClick={() => searchFiles()}>Buscar</button>
      </span>
      
      </div>
      <div class="">
      <ul class="list-group" id="listaArchivos"></ul>
      </div>
      </div>
    </>
  );
}
