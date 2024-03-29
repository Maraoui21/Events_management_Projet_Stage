import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Navbar = () =>{
    const navigate = useNavigate();
    let storedToken = Cookies.get('jwt');
    const isLoggedIN = storedToken!=null;
    const Role = storedToken && JSON.parse(storedToken).Role;
    const isAdmin = Role == 'admin';
    function addActive(e){

    }

    return (
        <>
            <header>
                <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="#" class="flex items-center">
                            <img src={require('../img/logo/Logo.png')} class="mr-3 lg:h-20 h-16 sm:h-9" alt="Flowbite Logo" />
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Commune de Laâyoune</span>
                        </a>
                        <div class="flex items-center lg:order-2">
                        {isLoggedIN?
                        <>
                            <Link to="/" onClick={e=>{Cookies.remove('jwt')}} class="flex cursor-pointer justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log out 
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/login" class="flex justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </>
                        }
                            <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul  class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link onClick={e=>addActive(e)} to="/" className={`block py-2 pr-4 pl-3 text-gray-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:border-0 lg:hover:text-blue-700`} aria-current="page">Accueil</Link>
                                </li>
                                {isLoggedIN?
                                <>
                                    <li >
                                        <Link onClick={e=>addActive(e)} to="addEvent" className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>Ajouter un événements</Link>
                                    </li>
                                    <li>
                                        <Link onClick={e=>addActive(e)} to="/participants" className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>Les participants des événements</Link>
                                    </li>
                                </>
                                :
                                null
                                }
                                {isAdmin?
                                    <li >
                                    <Link onClick={e=>addActive(e)} to="dashboard" className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>Dashboard</Link>
                                </li>
                                :null
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default Navbar;