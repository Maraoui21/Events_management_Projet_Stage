import React from 'react';
import Container from './Container';
import Footer from './Footer';
import Navbar from './Navbar';
import {Route,Routes} from "react-router-dom"
import AddEvent from './Forms/AddEvent';
import Dashboard from './Dashboard';
import Participants from './Participant';
import ProtectedRoutes from './ProtectedRoutes';
import EventPreview from './EventPreview';

const Accueil = () =>{
    return (
        <>  
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Container/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="addEvent" element={<AddEvent/>}/>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="participants" element={<Participants/>}/>
                    </Route>
                    <Route path="/preview/:id" element={<EventPreview/>}/>
                </Routes>
            <Footer/>
        </>
    )
}

export default Accueil;