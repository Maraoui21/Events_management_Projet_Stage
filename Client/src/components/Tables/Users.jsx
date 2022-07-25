import axios from "axios";
import React, { useEffect, useState } from "react"
import { headers } from "../Accueil";

const Users = ( )=>{
    const [users,setUsers]=useState([]);
	const [updateUserModal, setUpdateShowModal] = useState(false);
    const [updateMessage,setUpdateMessage] = useState();

	const  tableContainer = {
		'overflow': 'auto',
		'height': '330px'
	}
	const thStyle = {
		'position': 'sticky',
		'top': '0',
		'z-index': '1',
	}

	function fetchUser(){
		axios.get('http://localhost:3000/users',{headers})
		.then(e=>setUsers(e.data))
	}

	function updateUser(e){
		e.preventDefault();
		const firstName = e.target.first_name.value;
		const lastName = e.target.last_name.value;
		const phone  = e.target.phone.value;
		const email = e.target.email.value;
		const password = e.target.email.value;
		const NewUser = {Nom:firstName,Prenom:lastName,Password:password,email:email,Tel:phone}
		axios.put('http://localhost:3000/users',NewUser,{headers})
		.then(Response=>setUpdateMessage(Response.data.rep))
	}
	useEffect(()=>{
		fetchUser()
	},[])


    return(
        <>    
			<div class="overflow-x-auto">
				<div class="min-w-screen min-h-auto mb-5 font-sans overflow-hidden">
					<div class="w-full lg:w-full">
						<div style={tableContainer} class="shadow bg-white shadow-md rounded">
							<table class="min-w-max w-full table-auto">
								<thead>
									<tr style={thStyle} class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th style={thStyle} class="py-3 px-6 text-left">email</th>
										<th style={thStyle} class="py-3 px-6 text-left">User</th>
										<th style={thStyle} class="py-3 px-6 text-center">Role</th>
										<th style={thStyle} class="py-3 px-6 text-center">Actions</th>
									</tr>
								</thead>
								<tbody class="text-gray-600 text-sm font-light">
									{
										users && users.map((e,index)=>{
											var colors = ["red","sky","green","yellow"];
											var randColor = colors[Math.floor(Math.random() * colors.length)];
											return (
												<tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td class="py-3 px-6 text-left">
											<div class="flex items-center">
												<span class="font-medium">{e.email}</span>
											</div>
										</td>
										<td class="py-3 px-6 text-left">
											<div class="flex items-center">
												<div class="mr-2">
													<svg xmlns="http://www.w3.org/2000/svg" 
													class={`h-6 w-6 text-${randColor}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
													<path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												<span>{e.Nom}</span>
											</div>
										</td>
										<td class="py-3 px-6 text-center">
											<span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{e.UserRole}</span>
										</td>
										<td class="py-3 px-6 text-center">
											<div class="flex item-center justify-center">
												<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<div>
														<div  onClick={() => setUpdateShowModal(true)}>
														<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
														</svg>
														</div>
													</div>
												</div>
												<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
													</svg>
												</div>
											</div>
										</td>
									</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{updateUserModal ? (
        <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="p-10 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
				<div>
					<button onClick={() => setUpdateShowModal(false)} className="text-gray-400 float-right">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</button>
				</div>
				<form onSubmit={e=>{updateUser(e)}}>
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
        </>
        
    )
}
export default Users;