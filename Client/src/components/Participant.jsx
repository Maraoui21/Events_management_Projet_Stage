import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Participants = () =>{
    const StoredVal = Cookies.get('jwt');
    const jwt = StoredVal && JSON.parse(StoredVal).jwt;
    const headers = { 
        'Authorization': `Bearer ${jwt}`,
    };
    
    const  tableContainer = {
		'overflow': 'auto',
		'height': '330px'
	}
	const thStyle = {
		'position': 'sticky',
		'top': '0',
		'z-index': '1',
	}

    const [EvId,setIdEv]=useState('');
    const [Events,setEvent]=useState([]);
    const [EvParticipants,setParticipants]=useState([]);
    const [emptyOptionMsg,setEmpty]=useState('');
    const [isLoading,setLoading] = useState(false);

    function fetchData(){
        axios.get('http://localhost:3000/api/evenments',{headers})
        .then(Response=>{
            setEvent(Response.data)
        })
    }
    function searchEvntParticipants(){
        if(EvId==''){
            setEmpty('Choisir un evenement')
        }else{
            setLoading(true)
            axios.get(`http://localhost:3000/api/Participants/${EvId}`,{headers})
            .then(Response=>{
                setParticipants(Response.data)
                setLoading(false)
            })
        }
    }


    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div className="w-11/12 mx-auto px-16 py-10">
            <span className="text-red-500 p-2">{emptyOptionMsg}</span>
            <div className="md:flex items-center mt-3">
                <select onClick={e=>setEmpty('')} onChange={e=>setIdEv(e.currentTarget.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-2/4 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option disabled selected>Choisir un événement</option>
                {Events.map((e)=>{
                    return (
                        <option value={`${e.IdEv}`}>{e.Titre}</option>
                    )
                })}
            </select>
            <button onClick={e=>searchEvntParticipants()} type="button" class="md:w-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 md:ml-2 md:mt-0 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
            </button>
            </div>
            <div class="overflow-x-auto">
				<div class="min-w-screen min-h-auto mb-5 font-sans overflow-hidden">
					<div class="w-full lg:w-full">
						<div style={tableContainer} class="mt-5 shadow bg-white shadow-md rounded">
							<table class="min-w-max w-full table-auto">
								<thead>
									<tr style={thStyle} class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th style={thStyle} class="py-3 px-6 text-left">Nom</th>
                                        <th style={thStyle} class="py-3 px-6 text-center">Prenom</th>
										<th style={thStyle} class="py-3 px-6 text-left">Tel</th>
										<th style={thStyle} class="py-3 px-6 text-center">email</th>
									</tr>
								</thead>
								<tbody class="text-gray-600 text-sm font-light">
                                    {EvParticipants && EvParticipants.map(e=>{
                                        return (
                                            <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td class="py-3 px-6 text-left">
											<div class="flex items-center">
												<span class="text-slate-600 font-medium">{e.Nom}</span>
											</div>
										</td>
                                        <td class="py-3 px-6 text-center">
											<span class="text-slate-600 py-1 font-bold px-3  text-xs">{e.Prenom}</span>
										</td>
										<td class="py-3 px-6 text-center">
											<div>
												<span className="bg-yellow-100 text-slate-600 py-1 px-3 rounded-full text-xs font-bold">{e.Tel}</span>
											</div>
										</td>
										<td class="py-3 px-6 text-center">
											<span class="bg-green-200 text-slate-600 py-1 px-3 rounded-full font-bold text-xs">{e.email}</span>
										</td>
								    </tr>
                                        )
                                    })

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
        </div>
    )
}
export default Participants;