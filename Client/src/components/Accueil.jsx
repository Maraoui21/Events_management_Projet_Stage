import React from 'react';
import Container from './Container';
import Footer from './Footer';
import Cookies from "js-cookie";
import Navbar from './Navbar';
import {Route,Routes} from "react-router-dom"
import AddEvent from './Forms/AddEvent';
import Dashboard from './Dashboard';
import Participants from './Participant';
import ProtectedRoutes from './ProtectedRoutes';
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
                </Routes>
            <Footer/>
        </>
    )
}

// export {headers,StoredVal};
export default Accueil;