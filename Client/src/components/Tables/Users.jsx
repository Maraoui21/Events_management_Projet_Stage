import axios from "axios";
import React, { useEffect, useState,forwardRef,useImperativeHandle } from "react"
import Cookies from 'js-cookie';

const Users = forwardRef((childRef,ref)=>{

		const StoredVal = Cookies.get('jwt');
		const jwt = StoredVal && JSON.parse(StoredVal).jwt;
        const headers = { 
            'Authorization': `Bearer ${jwt}`,
        };

	const [users,setUsers]=useState([]);
	const [updateUserModal, setUpdateModal] = useState(false);
	const [deleteUserModal,setDeleteModal]= useState(false);
    const [updateMessage,setUpdateMessage] = useState();
	const [deleteMessage,setDeleteMessage] = useState();
	const [isLoading,setLoading] = useState(true);
	const [uniqueUser,setUser]=useState();
	const [toDelete,setDelete]=useState();
	
	useImperativeHandle(ref,()=>({

		callChildFunction(){
			fetchUsers()
		}
	}))


	const  tableContainer = {
		'overflow': 'auto',
		'height': '330px'
	}
	const thStyle = {
		'position': 'sticky',
		'top': '0',
		'z-index': '1',
	}
	
	function fetchUsers(){
		axios.get('http://localhost:3000/users',{headers})
		.then(e=>{
			setUsers(e.data)
			setLoading(false)
		})
	}

	function fetchUniqueUser(userId){
		axios.get(`http://localhost:3000/users/${userId}`,{headers})
		.then(e=>{
			setUser(e.data);
			setUpdateModal(true)
		})
	}

	function updateUser(e,IdUser){
		e.preventDefault();
		const firstName = e.target.first_name.value;
		const lastName = e.target.last_name.value;
		const phone  = e.target.phone.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const NewUser = {Nom:firstName,Prenom:lastName,Password:password,email:email,Tel:phone}
		console.log(NewUser)
		axios.put(`http://localhost:3000/users/${IdUser}`,NewUser,{headers})
		.then(Response=>{
			setUpdateMessage(Response.data.rep)
			fetchUsers();
		})
	}
	
	function deleteUser(userId){
		axios.delete(`http://localhost:3000/users/${userId}`,{headers})
		.then(e=>{
			setDeleteMessage(e.data.rep)
			fetchUsers();
		})
	}


	useEffect(()=>{
		fetchUsers()
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
												<tr key={index} class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
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
												<span className="text-slate-700">{e.Nom}</span>
											</div>
										</td>
										<td class="py-3 px-6 text-center">
											<span class="bg-green-200 text-slate-600 font-bold py-1 px-3 rounded-full text-xs">{e.UserRole}</span>
										</td>
										<td class="py-3 px-6 text-center">
											<div class="flex item-center justify-center">
												<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<div>
														<div  onClick={() => {
																fetchUniqueUser(e.IdUser)
																}}>
														<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
														</svg>
														</div>
													</div>
												</div>
												<div onClick={()=>{
														setDeleteModal(true)
														setDelete(e.IdUser)
													}} class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
													</svg>
												</div>
											</div>
										</td>
									</tr>
											)
										}).reverse()
									}
								</tbody>
							</table>
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
						</div>
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
				<span className="text-green-400 pb-4">{updateMessage}</span>
				<form onSubmit={e=>{updateUser(e,uniqueUser.IdUser)}}>
                    <div class="grid gap-6 mb-2 lg:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                            <input defaultValue={uniqueUser.Nom} onClick={e=>setUpdateMessage('')} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required/>
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
                            <input defaultValue={uniqueUser.Prenom} onClick={e=>setUpdateMessage('')} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required/>
                        </div>
                    </div>
                    <div class="mb-3">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                            <input defaultValue={uniqueUser.Phone} onClick={e=>setUpdateMessage('')} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0612345678" pattern="^\d{10}$" required/>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <input defaultValue={uniqueUser.email} onClick={e=>setUpdateMessage('')} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ahmed@gmail.com" required/>
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
				<span className="text-green-400 pb-4">{deleteMessage}</span>
				<div class="p-6 text-center">
							<svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
							<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user ?</h3>
							<button onClick={e=>deleteUser(toDelete)} data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
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
        
    )
})
export default Users;