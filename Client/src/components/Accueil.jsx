import React from 'react';
import Container from './Container';
import Footer from './Footer';
import Cookies from "js-cookie";
import Navbar from './Navbar';
import {Route,Routes} from "react-router-dom"
import AddEvent from './Forms/AddEvent';
import Dashboard from './Dashboard';

        const StoredVal = Cookies.get('jwt');
        const jwt = StoredVal && JSON.parse(StoredVal).jwt;
        const headers = { 
            'Authorization': `Bearer ${jwt}`,
        };

const Accueil = () =>{
    return (
        <>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Container/>}/>
                    <Route path="addEvent" element={<AddEvent/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                </Routes>
            <Footer/>
        </>
    )
}

export {headers,StoredVal};
export default Accueil;