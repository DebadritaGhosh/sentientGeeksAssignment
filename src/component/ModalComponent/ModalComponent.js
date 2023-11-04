import React from 'react';
import "./ModalComponent.css";
import StarComponent from '../StarComponent/StarComponent';

function ModalComponent({ data }) {
    return (
        <div className='modalComponent__container'>
            {
                data.map((movie, _) => (
                    <div className='modalComponent__item'>
                        <div className='modalComponent__leftContent'>
                            <p>{movie.title}</p>
                            <StarComponent numberOfStars={movie.rating} />
                        </div>
                        <div className='modalComponent__rightContent'>
                            <p>{movie.category}</p>
                        </div>
                    </div>
                ))
            }
            {
                data.length === 0 && <p className='modalComponent__noData'>No data found!</p>
            }
        </div>
    )
}

export default ModalComponent;