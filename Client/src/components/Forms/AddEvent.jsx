import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AddEvent = () =>{
    
    const [updateUserModal, setUpdateModal] = useState(false);
	const [deleteUserModal,setDeleteModal]= useState(false);
    const [updateMessage,setUpdateMessage]=useState();
    const StoredVal = Cookies.get('jwt');
    const jwt = StoredVal && JSON.parse(StoredVal).jwt;
    const headers = { 
        'Authorization': `Bearer ${jwt}`,
    };

    const [postStateMessage,setMessage]=useState('');
    const [SelectedImg,setImgPath]=useState();
    const [postedEvents,setEvent]=useState([]);
    const [isLoading,setLoading] = useState(true);

    const res = JSON.parse(StoredVal);
    const user = {name:res.name,email:res.email,Role:res.Role};
    const sendPost = (e)=>{
        e.preventDefault();
        
        const title = e.target.title.value;
        const date  = e.target.date.value;
        const IsoDate = new Date(date).toISOString();
        const img   = e.target.img.value;
        const content = e.target.content.value;
        const checkBoxs = e.target.formRadio;
        let checkedRadio;
        checkBoxs.forEach(element => {
            if(element.checked){
                checkedRadio = element.value;
            }
        });
        const Event = {Titre:title,ImgPath:img,Date:IsoDate,Contenu:content,Form:checkedRadio};
        console.log(Event)
        axios.post('http://localhost:3000/api/evenments',Event,{headers})
        .then(Response=>setMessage(Response.data.rep))
        setEvent((array)=>[...array,Event]);
    }
    function fetchData(){
        axios.get('http://localhost:3000/api/evenments',{headers})
        .then(Response=>{
            setEvent(Response.data)
            setLoading(false)
        })
    }
    function updateArticle(){

    }
    function deleteEvent(){

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
                            <h2 class="text-gray-800 capitalize text-xl mb-2 font-bold">
                                créer un nouvel événement 
                            </h2>
                            <span className="text-green-400">{postStateMessage}</span>
                                <form onClick={e=>{setMessage('')}} className="mt-3" onSubmit={sendPost}>
                                <div class="relative mb-6">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                    <input id="title" name="title" type="text" placeholder="Titre de l'événement" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0" required/>
                                </div>
                                <div class="relative mb-4">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                </div>
                                    <input name="date" type="date" placeholder="Titre de l'événement" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0" required/>
                                </div>
                                <div class="mb-3 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                                        <div class="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                                            <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                                
                                                <div class="flex items-center space-x-1 sm:pr-4">
                                                    <label>
                                                        <input onChange={(e)=>setImgPath(e.currentTarget.value)} type="file" class="w-1 h-1 absolute bg-gray-900" name="img" required/>
                                                        <svg class="cursor-pointer w-5 h-5 z-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
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
                                <div class="relative mb-3">
                                    <span>Ajouter le formulaire des participants</span>
                                    <span className="flex p-2">
                                        <div class="flex items-center mr-4">
                                            <input id="default-radio-1" type="radio" value="1" name="formRadio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">oui</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="default-radio-2" type="radio" value="0" name="formRadio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">non</label>
                                        </div>
                                    </span>
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
                        {isLoading?<>
										<div className="w-full p-5 text-center">
												<div role="status">
													<svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
														<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
													</svg>
													<span class="sr-only">Loading...</span>
												</div>
											</div>
									</>:null}
                            {
                                postedEvents && postedEvents.map((e,index)=>{
                                    return(
                                        <ul key={index} className="flex rounded items-center p-2 mb-2 border justify-between bg-slate-50">
                                <li className="mr-5"><img class="rounded h-10 w-10" src="https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg" alt="" /></li>
                                <li>{e.Titre}</li>
                                <span className="flex justify-between items-center">
                                    {/*DELETE ICONS*/}
                                    <li onClick={e=>setDeleteModal(true)} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg></li>
                                    {/*MODIFIE ICONS*/}
                                    <li onClick={e=>setUpdateModal(true)} className="cursor-pointer ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 hover:text-green-500" viewBox="0 0 20 20" fill="currentColor">
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
            {/*  updateBoxModal  */}
			{updateUserModal ? (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="p-10 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
				<div>
					<button onClick={() => setUpdateModal(false)} className="text-gray-400 float-right">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
				</div>
				<form onSubmit={e=>{updateArticle(e)}}>
                    <div class="grid gap-6 mb-2 lg:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                            <input onClick={e=>setUpdateMessage('')} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required/>
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
                            <input onClick={e=>setUpdateMessage('')} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required/>
                        </div>
                    </div>
                    <div class="mb-3">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                            <input onClick={e=>setUpdateMessage('')} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0612345678" pattern="^\d{10}$" required/>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <input onClick={e=>setUpdateMessage('')} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ahmed@gmail.com" required/>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Password</label>
                            <input onClick={e=>setUpdateMessage('')} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="azerty@123" required/>
                        </div>  
                <button type="submit" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null}
	{/* deleteBox alert */}
			{deleteUserModal ? (
				<>
					<div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="p-10 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
				<div>
					<button onClick={() => setDeleteModal(false)} className="text-gray-400 float-right">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
				</div>
				<div class="p-6 text-center">
							<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Événement ?</h3>
							<button onclick={e=>deleteEvent} data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
								Yes, I'm sure
							</button>
							<button onClick={e=>{setDeleteModal(false)}}data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
						</div>
            </div>
            </div>
        </div>
			        <div className="opacity-25 fixed inset-0 z-40 bg-black">
						</div>
			</>
			):null

			}	
        </>
    );
};


export default AddEvent;