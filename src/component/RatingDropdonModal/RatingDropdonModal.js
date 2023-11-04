import React from 'react'
import "./RatingDropdonModal.css";
import CustomDropdownComponent from '../DropdownModalComponent/DropdownModalComponent';
import StarComponent from '../StarComponent/StarComponent';

function RatingDropdonModal({ openRatingModal, allRatings, handleCheckboxChange, selectedRatings, setSelectedRatings }) {
    return (
        openRatingModal &&
        <div className='ratingDropdonModal'>{
            allRatings.map((rating, index) => (
                <CustomDropdownComponent>
                    <div className='customDropdownComponent__leftItem' key={index}>
                        <label >
                            <input
                                type="checkbox"
                                value={rating}
                                checked={selectedRatings.includes(rating)}
                                onChange={() => handleCheckboxChange(rating, selectedRatings, setSelectedRatings, 0)}

                            />
                        </label>
                    </div>
                    <div className='customDropdownComponent__rightItem'>{rating === 0 ? <p>Any Rating</p> : <StarComponent numberOfStars={rating} />}</div>
                </CustomDropdownComponent>
            ))}
        </div>
    )
}

export default RatingDropdonModal