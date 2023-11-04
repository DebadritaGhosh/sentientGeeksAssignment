import React from 'react'
import "./GenreDropdonModal.css";
import CustomDropdownComponent from '../DropdownModalComponent/DropdownModalComponent';

function GenreDropdonModal({ openGenreModal, allCategory, selectedGenres, setSelectedGenres, handleCheckboxChange }) {
    return (openGenreModal &&
        <div className='genreDropdonModal'>
            {allCategory.map((category, index) => (
                <CustomDropdownComponent>
                    <div className='customDropdownComponent__leftItem' key={index}>
                        <label >
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedGenres.includes(category)}
                                onChange={() => handleCheckboxChange(category, selectedGenres, setSelectedGenres, "Any genre")}

                            />
                        </label>
                    </div>
                    <div className='customDropdownComponent__rightItem'><p>{category}</p></div>
                </CustomDropdownComponent>

            ))
            }
        </div>
    )
}

export default GenreDropdonModal