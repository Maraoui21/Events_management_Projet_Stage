import axios from "axios";
import React,{useState} from "react";
import Cookies from 'js-cookie'
const AddUser = () =>{
    const StoredVal = Cookies.get('jwt');
		const jwt = StoredVal && JSON.parse(StoredVal).jwt;
        const headers = { 
            'Authorization': `Bearer ${jwt}`,
        };
    const [userStateMessage,setMessage]=useState('');

    function sendUser(e){
        e.preventDefault();
        const firstName = e.target.first_name.value;
        const lastName = e.target.last_name.value;
        const phone  = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.email.value;
        const NewUser = {Nom:firstName,Prenom:lastName,Password:password,email:email,Tel:phone}
        axios.post('http://localhost:3000/users',NewUser,{headers})
        .then(Response=>setMessage(Response.data.rep))
    }

    return(
        <>
            <div class="lg:ml-5 max-w-full mx-auto bg-white">
                <span className="text-green-400">{userStateMessage}</span>
                <form onSubmit={e=>{sendUser(e)}}>
                    <div class="grid gap-6 mb-2 lg:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                            <input onClick={e=>setMessage('')} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required/>
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
                            <input onClick={e=>setMessage('')} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prénom" required/>
                        </div>
                    </div>
                    <div class="mb-2">
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                            <input onClick={e=>setMessage('')} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0612345678" pattern="^\d{10}$" required/>
                        </div>
                        <div class="mb-2">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <input onClick={e=>setMessage('')} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ahmed@gmail.com" required/>
                        </div>
                        <div class="mb-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Password</label>
                            <input onClick={e=>setMessage('')} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="azerty@123" required/>
                        </div>  
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>      
        </>
    )
}

export default AddUser;