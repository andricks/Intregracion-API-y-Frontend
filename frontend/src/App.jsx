// src/App.js

import React from 'react';

import TablaSencilla from './components/TablaSencilla';

import Gallery from './components/Gallery';

function App() {

  const imagenes = [
    
    'https://media.istockphoto.com/id/1443409611/es/foto/hombre-en-piedra-en-la-colina-y-hermosas-monta%C3%B1as-en-bruma-en-la-colorida-puesta-de-sol-en.jpg?s=612x612&w=is&k=20&c=--XbASTEvOsxASYoyrgn4qk0CVvFPUMWAo3YARGf93E=',
    'https://media.istockphoto.com/id/598239692/es/foto/el-viajero-se-encuentra-con-el-amanecer-en-las-monta%C3%B1as.jpg?s=1024x1024&w=is&k=20&c=aeOybNmLdzd5m_Jg4OcZeDf62qpyO47qus6UM-uBIMs='
    // Agrega más URLs de imágenes aquí
  ];

  return (
    <div className="App">
       <TablaSencilla />
    <h1>Galería de Imágenes</h1>
    <Gallery imagenes={imagenes}  />
  </div>
  );
}

export default App;
