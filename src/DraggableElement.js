import React from "react"
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem"

function DraggableElement({elements,prefix }){
    return(
        <div className="droppableStyles">
            <div className="columnHeader">{prefix === "not_Started" ? "not started" : prefix}</div>
            <Droppable droppableId={`${prefix}`}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="droppableItemStyles">
                        {elements.map((item, index) => (
                            <ListItem key={item.id} item={item} index={index} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
    
}
export default DraggableElement