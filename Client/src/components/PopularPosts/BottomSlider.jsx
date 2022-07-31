import React, { useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/themes/splide-skyblue.min.css';

const BottomSlider = () => {

    function getSnippet(text, length) {
        const result = text.substr(0, length*5);
        return result;
    }

    const paragraphe = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis`;

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
                
    } }
    aria-label="My Favorite Images">
        <SplideSlide className="px-1">
            <div class="splide__slide__container rounded">
                <img src={require('../../img/EventsImg/testImg.jfif')} alt="Image 1"/>
            </div>
            <p className="p-1 cursor-pointer pt-4 pb-8">
                {getSnippet(paragraphe,20)}
            </p>
        </SplideSlide>
        <SplideSlide className="px-1">
            <div class="splide__slide__container rounded">
                <img src={require('../../img/LoginBackground/LoginHero.jpg')} alt="Image 2"/>
            </div>
            <p  className="p-1 cursor-pointer pt-4 pb-8">
            {getSnippet(paragraphe,20)}
            </p>
        </SplideSlide>
        <SplideSlide className="px-1">
            <div class="splide__slide__container rounded">
                <img src={require('../../img/LoginBackground/LoginHero.jpg')} alt="Image 2"/>
            </div>
            <p className="p-1 cursor-pointer pt-4 pb-8">
            {getSnippet(paragraphe,20)}
            </p>
        </SplideSlide>
    </Splide>
    </>
    )
}
export default BottomSlider;