import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ListItem({ item, index }){
    return(
        <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              className="dragItem"
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p className="card_header">{item.taskName}</p>
              {item.mediaUrl !== "" &&
                <img className="img_tag" src={item.mediaUrl}></img>
              }
        
              <div className="card_footer">
                <img src="/images/avatar.png" alt="avatar" className="avatar-img" />
                {item.closureComment !== "" &&
                  <div className="tooltips">
                    <img className="icon_tag" src="images/comment.svg"></img>
                    <span className="tooltiptext">{item.closureComment}</span>
                  </div> }
              </div>
            </div>
          );
        }}
      </Draggable>
    )
}
export default ListItem