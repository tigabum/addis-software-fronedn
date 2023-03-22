import React from 'react';

const ListItem = (props)=>{
        return (
            <li>
                <a href={props.id} id={props.id}>
                    {props.name}
                </a>
            </li>
        );
}

export default ListItem;