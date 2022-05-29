import React from 'react'
import {FaStar, FaStarHalfAlt} from 'react-icons/fa'
export default function Rating({rating,numReviews}) {
    return (
        <div className="rating">
            {/*  case fill star : case half star : case no star   */}
                {rating === 0 && (
                    <div className="zero_rating">
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                        <FaStar/>
                    </div>
                ) 
                } 
            {rating >= 1 ? <FaStar/> : rating >= .5 ? <FaStarHalfAlt/> : ''} 
            {rating >= 2 ? <FaStar/> : rating >= 1.5 ? <FaStarHalfAlt/> : ''}
            {rating >= 3 ? <FaStar/> : rating >= 2.5 ? <FaStarHalfAlt/> : ''}
            {rating >= 4 ? <FaStar/> : rating >= 3.5 ? <FaStarHalfAlt/> : ''}
            {rating >= 5 ? <FaStar/> : rating >= 4.5 ? <FaStarHalfAlt/> :''}
             {numReviews !== 0 && numReviews > 0 &&  (
                 <span> ({numReviews}) </span>
             )}
        </div>
    )
}
