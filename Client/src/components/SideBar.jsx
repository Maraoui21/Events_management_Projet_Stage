import React from "react";

const SideBar = ( )=>{
    return (
        <aside class="w-full md:w-1/3 flex flex-col items-center px-3">

                    
                    <div class="w-full flex flex-col bg-white shadow flex flex-col my-4 p-6 items-center">
                        <p class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3">About Us</p>
                        <img className="w-9/12 p-5 h-2/3" src={require('../img/logo/commune-de-laayounevector-seeklogo.com.svg')} />
                        <p class="pb-2 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                    </div>

                    {/* <div class="w-full bg-white flex flex-col my-4 p-6 shadow"> */}
                        {/* <div class="grid grid-cols-3 gap-3">
                            <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1"/>
                        </div> */}
                        {/* <a href="#" class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
                            commune de laayoune
                        </a>
                    </div> */}

                </aside>
    )
}

export default SideBar;