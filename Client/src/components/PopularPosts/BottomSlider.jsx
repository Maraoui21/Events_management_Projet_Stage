import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/themes/splide-skyblue.min.css';
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";

const BottomSlider = () => {

    const [smallEvents,setSmallEvents] = useState([]);
    const navigate = useNavigate();
    function changeLocation(path){
        navigate(path)
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/api/evenments/',)
        .then(e=>{
            setSmallEvents(e.data)
        })
    },[])

    return ( 
    <>
    <h2 className="p-2 rounded font-bold text-2xl mb-3">
        Les derniers événements
    </h2>
    <Splide
    options={ {
        type:'loop',
                perPage : 2,
                cover   : true,
                height  : '10rem',
                autoplay: true,
                breakpoints:{
                    640:{
                        perPage: 1,
                    }
                }
                
    }}
    aria-label="My Favorite Images">
        {
        smallEvents && smallEvents.map(e=>{
                const id = e.IdEv;
                return(
                    <SplideSlide key={e.IdEv} className="px-1">
                            <div 
                            onClick={e=>{changeLocation(`/preview/${id}`)}}
                            class="splide__slide__container rounded cursor-pointer">
                                    <img
                                    src={`http://localhost:3000/EventsImages/${e.ImgPath}`}
                                    alt="Image 1"/>
                            </div>
                        <Link to={`/preview/${e.IdEv}`}>
                            <p className="p-1 cursor-pointer pt-4 pb-8">
                            {e.Titre}
                            </p>
                        </Link>
                    </SplideSlide>
                )
            })
        }
    </Splide>
    </>
    )
}
export default BottomSlider;