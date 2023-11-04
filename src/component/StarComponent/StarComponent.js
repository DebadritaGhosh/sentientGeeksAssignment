//Importing system
import React from 'react'
//Importing style
import "./StarComponent.css"
//Importing icons
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

function StarComponent({ numberOfStars }) {

    const starRating = Array.from({ length: 10 }, (_, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {
                    numberOfStars >= index + 1 ? (<FaStar className='icon' />) :
                    numberOfStars >= number ? (<FaStarHalfAlt className='icon' />) :
                            (<AiOutlineStar className='icon' />)
                }
            </span>
        )
    })

    // console.log(starRating)
    return (
        <div>{starRating}</div>
    )
}

export default StarComponent