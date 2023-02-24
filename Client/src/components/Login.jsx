import React, { useRef } from 'react';
import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import background from "../img/LoginBackground/LoginHero.jpg"

const Login = ( ) =>{

	const [errMessage,setErr]=useState();
	const [email,setEmail]=useState();
	const [password,setPassword]=useState();
	const navigate = useNavigate();
	const inputRef = useRef();
	function changeFocus(){
		inputRef.current.focus();
	}


	const handleSubmit= (e)=>{
		e.preventDefault();
		const user = {Nom:email,password:password};
		axios.post('https://event4manager.onrender.com/Login', user)
        .then(response =>{
			const obj = response.data;
			if('jwt' in obj){
				const JsonObj = JSON.stringify(obj)
				Cookies.set('jwt',JsonObj);
				navigate('/')
			}else{
				setErr(obj.err)
			}
			
		});
	}


	return (
		<>
			<div class="h-screen flex">
        <div 
		style={{backgroundImage:`linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(${background})`,backgroundRepeat: "no-repeat",
		backgroundSize:"cover"}}
		class="hidden lg:flex w-full lg:w-1/2 login_img_section
        justify-around items-center">
            <div 
                class=" 
                bg-black 
                opacity-20 
                inset-0 
                z-0"
                >

                </div>
            <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 class="text-white font-bold text-4xl font-sans">Commune de Laayoune</h1>
            <p class="text-white mt-1">Laâyoune-Sakia El Hamra</p>
            <div onClick={changeFocus} class="flex justify-center lg:justify-start mt-6 cursor-pointer">
                <span  class="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Les derniers événements</span>
            </div>
            </div>
        </div>
        <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
            <div class="w-full px-8 md:px-32 lg:px-24">
            <form onSubmit={handleSubmit} class="bg-white rounded-md shadow-2xl p-5">
					<h1 class="text-gray-800 font-bold text-2xl mb-1">Bienvenue</h1>
						<p class="text-sm font-normal text-red-600 mb-8">{errMessage}</p>
							<div class="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
								</svg>
								<input ref={inputRef} onClick={e=>{setErr('')}}onChange={e=>{setEmail(e.currentTarget.value)}} id="email" class="pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" required/>
							</div>
						<div class="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
							</svg>
							<input onClick={e=>{setErr('')}} onChange={e=>{setPassword(e.currentTarget.value)}} class="pl-2 w-full  outline-none border-none" type="password" name="password" id="password" placeholder="Password" required/>
						</div>
						<button  type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
						<div class="flex justify-center mt-4">
							{/*onlick change focus to login*/}
							<div class="md:hidden block text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
							Les derniers événements
							</div>
						</div>
            </form>
            </div>
        </div>
    </div>	
		</>
	)
}

export default Login;