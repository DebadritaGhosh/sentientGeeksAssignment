import React from 'react'
import "./DropdownModalComponent.css";

function CustomDropdownComponent({ children }) {


    return (
        <div className='customDropdownComponent__container'>
            {children}
        </div>
    )
}

export default CustomDropdownComponent;