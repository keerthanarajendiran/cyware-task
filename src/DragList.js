import React,{useState, useCallback} from "react"
import {DragDropContext} from "react-beautiful-dnd"
import DraggableElement from "./DraggableElement";
import Modal from './Modal';
import {list, data} from "./Constants";

let count=7;

const removeFromList = (list, index,comment) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    removed["closureComment"]=comment;

    return [removed, result];
};
  
const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

function DragList(){
    const [show, setShow] = useState(false);
    const [obj_list, setObjList] = useState(data);
    const [search_value,setSearchValue] = useState("");
    const [searchObjList,setCopyObj] = useState({})
    
    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = (taskName, assignee, imageFile) => {
        setShow(false);
        const newArr =[...obj_list["not_Started"]];
        let obj= {
            id: `task-${count}`,
            taskName: taskName,
            assignee: assignee,
            mediaUrl: URL.createObjectURL(imageFile),
            closureComment:""
        }
        count=count+1;
        newArr.push(obj)
        obj_list["not_Started"] = newArr
        setObjList({...obj_list})
    }

    const handleShow = () => setShow(true);

    const handleSearch =(value)=>{  
        const searchval = {...obj_list};
        searchval["not_Started"] =searchval["not_Started"].filter((item)=>{
            return item.taskName.toLowerCase().includes(value.toLowerCase());
        })
        searchval["development"] =searchval["development"].filter((item)=>{
            return item.taskName.toLowerCase().includes(value.toLowerCase());
        })
        searchval["completed"] =searchval["completed"].filter((item)=>{
            return item.taskName.toLowerCase().includes(value.toLowerCase());
        })
        setSearchValue(value);
        setCopyObj(searchval);
    }
    
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };
    
    const optimizedSearch = useCallback(debounce(handleSearch), []);

    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
        const listCopy = { ...obj_list };
        const sourceList = listCopy[result.source.droppableId];
        var comment_text="";
        if(result.destination.droppableId =="completed"){
            const comments = prompt('Add Closure Comment');
            if(comments){
                comment_text = comments
            }
        }
        const [removedElement, newSourceList] = removeFromList(
          sourceList,
          result.source.index,
          comment_text
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
          destinationList,
          result.destination.index,
          removedElement
        );
    
        setObjList(listCopy);
    };

    return(
        <div>
            <header className="header">
                <h2 className="task_heading">Task Management</h2>
                <input className="search_input" type="text" onChange={(e) => optimizedSearch(e.target.value)} placeholder="Search by task name"></input>
            </header>
            <div className="body_wrapper">
                <div className="align-left">
                    <button onClick={handleShow} className="primary_button">Add Task</button>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex_wrapper">
                        {list.map(listKey=>(
                            <DraggableElement  
                                elements={search_value!=""?searchObjList[listKey]:obj_list[listKey]}
                                key={listKey}
                                prefix={listKey}></DraggableElement>
                        ))}
                    </div>
                </DragDropContext>        
                <Modal handleClose={handleClose} handleSubmit={handleSubmit} show={show}></Modal>
            </div>
        </div>
    )
}
export default DragList