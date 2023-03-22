import React, { useState } from 'react';

const GenreFormItem = (props) =>{
    const[isChecked, setIsChecked] = useState(props.checked)


    const handleCheckChange =(event)=> {
        let newchecked = !isChecked
        setIsChecked(newchecked);

        props.handleCheck(event.target.id, !isChecked);
    }

 
        return (
            <label>
                {props.genre.name}
                <input type="checkbox" 
                       className="padding-left"
                       checked={isChecked}
                       id={props.genre.id}
                       onChange={handleCheckChange} />
            </label>
        );
}

export default GenreFormItem;