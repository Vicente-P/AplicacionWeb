import React from 'react';

export default function Archivos() {

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiI1NTUiLCJwYXNzd29yZF9oYXNoIjoiJDJiJDEyJHdQeXpOSkowM25TeXhMcEU3MFFiVWU0RTh0SDZpdWt4blY5UUp5Q09mNHY3aUg3cnhQMS9HIn0.qGNa6vKqRlqZHMu0sRZj4aGKLWdkrklv_kq4vc_PRbI';
var nombresArchivos;
fetch('http://18.222.116.56:8080/metadata', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then(response => response.json()) // Convertir la respuesta a formato JSON
  .then(data => {
  	console.log(data)
    nombresArchivos = data.map(objeto => objeto.nombre_archivo);
    console.log(nombresArchivos);
    const listElement = document.createElement('ul');
	listElement.classList.add('list-group'); // Agregar clase list-group de Bootstrap

	nombresArchivos.forEach(fileName => {
	  const listItem = document.createElement('a');
	  listItem.textContent = fileName;
	  listItem.classList.add('list-group-item'); // Agregar clase list-group-item de Bootstrap
	  listItem.classList.add('btn'); // Agregar clase list-group-item de Bootstrap
	  listItem.classList.add('btn-dark'); // Agregar clase list-group-item de Bootstrap
    listItem.setAttribute('href', 'http://18.224.14.85:8080/download_files?filename='+fileName); // Agregar atributo href
    listItem.setAttribute('target', '_blank'); // Agregar atributo href
	  listElement.appendChild(listItem);
	});

	// Crear el div contenedor con la clase 'container'
	const containerDiv = document.createElement('div');
	containerDiv.classList.add('container');

	// Agregar la lista desordenada al div contenedor
	containerDiv.appendChild(listElement);

	// Agrega el div contenedor al elemento con el ID 'root'
	const rootElement = document.getElementById('archivos');
	rootElement.appendChild(containerDiv);

  })
  .catch(error => {
    console.error('Ha ocurrido un error:', error);
  });



  return (
    <>
      <div class="container">	
      <h1 class='display-1' className="center">Viendo archivos subidos</h1>
      <div id="archivos"></div>
      </div>
    </>
  );
}
	