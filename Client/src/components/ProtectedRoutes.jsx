import React from "react";
import Cookies from "js-cookie";
import { Outlet,Navigate } from "react-router-dom";
import Login from "./Login";
const useAuth = () =>{
    const user = Cookies.get('jwt');
    return user && JSON.parse(user).jwt;
}

const ProtectedRoutes = ( ) =>{
    const isAuth = useAuth();
    return isAuth?<Outlet/>:<Navigate to="/Login"/>;
}

export default ProtectedRoutes;