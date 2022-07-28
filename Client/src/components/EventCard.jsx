import React from "react";
import { Link } from "react-router-dom";
const EventCard = (props) =>{
    function getSnippet(text, length) {
        const result = text.substr(0, length*5);
        return result;
    }
    return (
        <>
            <article class="flex flex-col shadow my-4">
                        <a href="#" class="hover:opacity-75">
                            <img src={props.img}/>
                        </a>
                        <div class="bg-white flex flex-col justify-start p-6">
                            <Link to={`/preview/${props.EvID}`} class="text-3xl capitalize font-bold hover:text-gray-700 pb-4">{props.title}</Link>
                            <p href="#" class="text-sm pb-3">
                            Published on <a href="#" class="font-semibold hover:text-gray-800">{props.date}</a>
                            </p>
                                <Link to={`/preview/${props.EvID}`} className="pb-3">{getSnippet(props.content,30)}...</Link>
                                <Link to={`/preview/${props.EvID}`} class="text-base font-bold font-sans text-blue-800 hover:text-blue-700">Continue Reading</Link>
                        </div>
            </article>
        </>
    )

}
export default EventCard;