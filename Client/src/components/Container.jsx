import React , {useEffect, useState} from "react";
import EventCard from "./EventCard";
import Cookies from "js-cookie";
import axios from "axios";
import SideBar from "./SideBar";
const Container = ()=>{

    const StoredVal = Cookies.get('jwt');
    const jwt = StoredVal && JSON.parse(StoredVal).jwt;
    const headers = { 
        'Authorization': `Bearer ${jwt}`,
    };

    const [Events,setEvent]=useState([]);

    function fetchData(){
        axios.get('http://localhost:3000/api/evenments',{headers})
        .then(Response=>{
            setEvent(Response.data)
        })
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(
        <>
            <div class="container mx-auto flex flex-wrap py-6 xl:px-28 lg:px-10 px-5">
                <section class="w-full md:w-2/3 flex flex-col items-center px-3">
                    {Events && Events.map((e)=>{
                            return (
                                <EventCard  img={require('../img/EventsImg/testImg.jfif')}
                                title={`${e.Titre}`}
                                date={`${e.Date.split('T')[0]}`}
                                content={`${e.Contenu}`}
                                EvID={`${e.IdEv}`}
                                />
                            )
                        }).reverse()

                    }
                    <div class="flex items-center py-8">
                        <a href="#" class="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</a>
                        <a href="#" class="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</a>
                        <a href="#" class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <svg class="svg-inline--fa fa-arrow-right fa-w-14 ml-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg><i class="fas fa-arrow-right ml-2"></i></a>
                    </div>

                </section>
                <SideBar/>
            </div>
        </>
    )
}

export default Container;