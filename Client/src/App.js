
import React from 'react';
import Login from "./components/Login"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Accueil from './components/Accueil';
function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Accueil/>} />
              <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
