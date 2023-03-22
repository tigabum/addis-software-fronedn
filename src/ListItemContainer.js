import React from "react";
import ListItem from "./ListItem";

const ListItemContainer = (props) => {
    // console.log('props.', props)
  return (
    <div className="one-third column content-column">
      <h4>List of {props.type}</h4>
      <ul>
          {/* <ListItem key="one" id="1" name="listname"/> */}
        {props.data && props.data.map((item) => {
          return <ListItem key={item._id} id={item._id} name={item.title} />;
        })}
      </ul>
      <button onClick={props.handleButtonClick}> + Create new</button>
    </div>
  );
};

export default ListItemContainer;
