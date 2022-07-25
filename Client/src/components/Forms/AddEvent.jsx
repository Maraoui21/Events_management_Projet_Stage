import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from '../Navbar';
import { headers,StoredVal } from "../Accueil";
import { useNavigate } from "react-router-dom";

const AddEvent = () =>{
    const [postStateMessage,setMessage]=useState('');
    const [SelectedImg,setImgPath]=useState();
    const [postedEvents,setEvent]=useState([]);
    const res = JSON.parse(StoredVal);
    const user = {name:res.name,email:res.email,Role:res.Role};
    const sendPost = (e)=>{
        e.preventDefault();
        
        const title = e.target.title.value;
        const date  = e.target.date.value;
        const IsoDate = new Date(date).toISOString();
        const img   = e.target.img.value;
        const content = e.target.content.value;
        const Event = {Titre:title,ImgPath:img,Date:IsoDate,Contenu:content};
        axios.post('http://localhost:3000/api/evenments',Event,{headers})
        .then(Response=>setMessage(Response.data.rep))
        setEvent((array)=>[...array,Event]);
    }
    function fetchData(){
        axios.get('http://localhost:3000/api/evenments',{headers})
        .then(Response=>setEvent(Response.data))
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <>
            <span>
                <div class="md:flex items-center justify-start xl:px-28 md:px-24 my-8 px-10">
                            <p class="mr-2 flex pb-1 items-center text-sm font-medium text-gray-900 truncate dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 text-blue-700 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                                {user.name}
                            </p>
                            <p class="mr-2 flex text-sm pb-1 text-gray-500 truncate dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {user.email}
                            </p>
                        <div class="mr-2 inline-flex pb-1 items-center text-base font-semibold text-green-400 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {user.Role}
                        </div>
                </div>
            </span>
            <div className="grid lg:grid-cols-5 gap-4 lg:px-24 md:px-16 px-10">
                    <div className="EventForm lg:col-span-3 mb-5">
                            <div class="max-w-3xl mx-auto">
                            <h2 class="text-gray-800 capitalize text-xl mb-5 font-bold">
                                créer un nouvel événement 
                            </h2>
                            <span className="text-green-400">{postStateMessage}</span>
                                <form className="mt-2" onSubmit={sendPost}>
                                <div class="relative mb-6">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                    <input id="title" name="title" type="text" placeholder="Titre de l'événement" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0" required/>
                                </div>
                                <div class="relative mb-6">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                </div>
                                    <input name="date" type="date" placeholder="Titre de l'événement" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0" required/>
                                </div>
                                    <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                                        <div class="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                                            <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                                
                                                <div class="flex items-center space-x-1 sm:pr-4">
                                                    <label>
                                                        <input onChange={(e)=>setImgPath(e.currentTarget.value)} type="file" class="w-1 h-1 absolute bg-gray-900" name="img" required/>
                                                        <svg class="w-5 h-5 z-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="button" data-tooltip-target="tooltip-fullscreen" class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <img src={SelectedImg} alt="" />
                                            </button>
                                            <div id="tooltip-fullscreen" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                Show full screen
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                        <div class="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                                            <label for="editor" class="sr-only">Publish post</label>
                                            <textarea name="content" id="editor" rows="8" class="block px-0 w-full outline-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400
                                            dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-blue-500" placeholder="Write an article..." required></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                        Publish post
                                    </button>
                                </form>
                            </div>
                    </div>
                    <div className="PostedEvents rounded lg:col-span-2 ">
                    <h2 class="text-gray-800 capitalize text-xl mb-5 font-bold">
                        Les événements publiés
                        </h2>
                        <div className="post max-h-80 p-2 overflow-auto">
                            {
                                postedEvents && postedEvents.map((e,index)=>{
                                    return(
                                        <ul key={index} className="flex rounded items-center p-2 mb-2 border justify-between bg-slate-50">
                                <li className="mr-5"><img class="rounded h-10 w-10" src="https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg" alt="" /></li>
                                <li>{e.Titre}</li>
                                <span className="flex justify-between items-center">
                                    {/*DELETE ICONS*/}
                                    <li className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg></li>
                                    {/*MODIFIE ICONS*/}
                                    <li className="cursor-pointer ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                        </svg>
                                    </li>
                                </span>
                            </ul> 
                                    )
                                })
                            }
                        </div>
                    </div>
            </div>
        </>
    );
};


export default AddEvent;