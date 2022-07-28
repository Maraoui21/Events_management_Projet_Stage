import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SideBar from "./SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EventPreview = ()=>{

    const {id} = useParams();
    const [event,setEvent]=useState({});
    function fetchData(){
        axios.get(`http://localhost:3000/api/evenments/${id}`)
        .then(Response=>{
            setEvent(Response.data)
        })
    }
    useEffect(()=>{
        fetchData()
    })



    return (
        <div className="container mx-auto flex flex-wrap py-6 xl:px-28 lg:px-10 px-5">
        <div className="w-full md:w-2/3 flex flex-col items-center px-3">
            <article class="flex flex-col shadow my-4">
                        <a href="#" class="hover:opacity-75">
                            <img src={require('../img/EventsImg/testImg.jfif')}/>
                        </a>
                        <div class="bg-white flex flex-col justify-start p-6">
                            <h2 class="text-3xl capitalize font-bold hover:text-gray-700 pb-4">
                                {
                                    event.Titre
                                }
                            </h2>
                            <p class="text-sm pb-3">
                            Published on <span class="font-semibold hover:text-gray-800">{event.Date && event.Date.split('T')[0]}</span>
                            </p>
                                <p className="pb-3 leading-loose">{event.Contenu}</p>
                            
                        </div>
            </article>
        </div>
        <SideBar/>
        </div>
        
    )
}

export default EventPreview;