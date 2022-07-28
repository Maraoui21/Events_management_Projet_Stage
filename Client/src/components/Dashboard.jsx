import React from "react";
import { Link } from "react-router-dom";
import Users from "./Tables/Users";
import DashboardCounters from "./DashboardCounters";
import AddUser from "./Forms/AddUser";
import { useRef } from "react";

const Dashboard = () =>{
    const childRef = useRef();

    function callParent(){
        childRef.current.callChildFunction()
    }

    return(
        <div className="w-11/12 mx-auto px-16 py-10">
            <DashboardCounters/>
            <div className="lg:grid lg:grid-cols-12 gap-6 my-8">   
            <div className="lg:col-span-8 lg:mr-2">
                <h2 class="text-gray-800 capitalize text-xl mb-5 font-bold">Les utilisateurs disponibles</h2>
                    <Users ref={childRef}/>
                </div>
                <div className="lg:col-span-4">
                        <h2 class="text-gray-800 capitalize text-xl mb-5 font-bold">
                            créer un nouvel utilisateur 
                        </h2>
                    <AddUser callParent={()=>callParent()}/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;