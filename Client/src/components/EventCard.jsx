import React from "react";

const EventCard = (props) =>{
    return (
        <>
            <article class="flex flex-col shadow my-4">
                        <a href="#" class="hover:opacity-75">
                            <img src={props.img}/>
                        </a>
                        <div class="bg-white flex flex-col justify-start p-6">
                            <a href="#" class="text-3xl font-bold hover:text-gray-700 pb-4">{props.title}</a>
                            <p href="#" class="text-sm pb-3">
                                By <a href="#" class="font-semibold hover:text-gray-800">{props.publisher}</a>, Published on April 25th, 2020
                            </p>
                            <a href="#" class="pb-6">{props.content}</a>
                            <a href="#" class="uppercase text-gray-800 hover:text-black">Continue Reading</a>
                        </div>
            </article>
        </>
    )

}
export default EventCard;