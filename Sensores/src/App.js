import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Archivos from './components/pages/Archivos';
import  Buscador from './components/pages/Buscador';
import  Coordenada from './components/pages/Coordenada';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Archivos' element={<Archivos/>}/>
        <Route path='/Buscador' element={<Buscador/>}/>
        <Route path='/Coordenada' element={<Coordenada/>}/>
      </Routes>
    </Router>
  );
}

export default App;
