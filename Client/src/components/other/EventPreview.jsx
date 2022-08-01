import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BottomSlider from "../PopularPosts/BottomSlider";
const EventPreview = ()=>{
    const [inscriptionBox,setBoxState]=useState(false);
    const {id} = useParams();
    const [event,setEvent]=useState({});
    const [verifyBtn,setVerify]=useState(false);
    const [registreMessage,setMessage]=useState();

    function hideAlerts(){
        setMessage('')
        setVerify(false)
    }

    function fetchData(){
        axios.get(`http://localhost:3000/api/evenments/${id}`)
        .then(Response=>{
            setEvent(Response.data)
        })
    }
    function inscrire(e){
        e.preventDefault()
        const firstName = e.target.first_name.value;
        const lastName = e.target.last_name.value;
        const phone  = e.target.phone.value;
        const email = e.target.email.value;

        // the variable id is the event id

        const Participant = {Nom:firstName,Prenom:lastName,Tel:phone,email:email,EvenementID:id};
        axios.post('http://localhost:3000/api/Participants',Participant)
        .then((e)=>
            {
            if(e.data.rep!==undefined){
                    setMessage(e.data.rep);
                    setVerify(true);
                }
            else
                {
                    if(e.data.warr!==undefined){
                        setMessage(e.data.warr)
                        setVerify(true)
                    }
                    else{
                        setMessage(e.data.err)
                    }
                }
            }
        )
    }


    useEffect(()=>{
        fetchData()
        window.scrollTo(0, 0)
    },[id])



    return (
        <div className="container mx-auto flex flex-wrap py-6 xl:px-28 lg:px-10 px-5">
        <div className="w-full md:w-2/3 flex flex-col px-3">
            <article class="flex flex-col shadow my-4">
                        <span href="#" class="hover:opacity-75">
                        <div className="w-full h-96 bg-cover bg-no-repeat" 
                        style={{ backgroundImage:`url(${`http://localhost:3000/EventsImages/${event.ImgPath}`})` }}>
                        </div>
                        </span>
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
                                {event.Form?
                                <>
                                        <button onClick={e=>setBoxState(true)} type="button" class="text-white flex justify-around w-2/6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        S'inscrire
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                        </svg>
                                    </button>
                                </>:null}
                        </div>
            </article>
            <BottomSlider/>
        </div>
        <SideBar/>
        {
            inscriptionBox?
            <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="p-10 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
				<div>
					<button onClick={() => {
                        setBoxState(false)
                        setVerify(false)
                        setMessage('')
                        }} className="text-gray-400 mb-5 float-right">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
				</div>
                <span className="text-green-400 mb-3">
                <div>{registreMessage}</div>
                {verifyBtn?<><Link to="" className="text-sm text-blue-700 my-8 underline underline-offset-2">Vérifier votre inscription</Link></>:null}
                </span>
                    <form onSubmit={e=>inscrire(e)}>
                            <div class="grid gap-6 mb-3 lg:grid-cols-2">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                                    <input onClick={e=>hideAlerts()} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required/>
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
                                    <input onClick={e=>hideAlerts()} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required/>
                                </div>
                            </div>
                            <div class="mb-3">
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                                    <input onClick={e=>hideAlerts()} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0612345678" pattern="^\d{10}$" required/>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                    <input onClick={e=>hideAlerts()} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ahmed@gmail.com" required/>
                                </div>
                        <button type="submit" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>:null
        }
        </div>
        
    )
}

export default EventPreview;