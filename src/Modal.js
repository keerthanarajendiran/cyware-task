import React, { useState } from "react"

function Modal({ handleClose, handleSubmit, show }){
    const [taskName,setTaskName] = useState("");
    const [assignee, setAssignee] = useState("");
    const [imageFile, setImageFile] = useState({})

    const handleChoose = (e) => {
       setImageFile(e.target.files[0])
    }

    return(
    <>
        {show && 
        <div id="myModal" className="modals">
            <div className="modal-contents">
                <div className="modal-header">
                    <h3 className="modal-heading">Add New Task</h3>
                    <img src="images/close.svg" className="close_img" onClick={handleClose}></img>
                </div>
                 
                <div className="modal-body"> 
                    <div>
                        <label className="input-label">Task Name*</label>
                        <input type="text" className="search_input width-100" placeholder="please enter the task name" value={taskName} onChange={(e)=>setTaskName(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="input-label">Assignee*</label>
                        <select value={assignee} onChange={e=>setAssignee(e.target.value)} className="search_input width-100">
                            <option value="">Select an option</option>
                            <option value="self">Assign to yourself</option>
                        </select>
                    </div>
                    <div>
                        <label className="input-label">Attachments</label>
                        <input type="file" id="attachment" className="search_input width-100" onChange={handleChoose}></input>
                    </div>
                </div> 

                <div className="modal-footer">
                    <button onClick={handleClose} className="secondary_button">Cancel</button>
                    <button onClick={()=>handleSubmit(taskName, assignee, imageFile)} disabled={(!taskName || !assignee)} className="left-space primary_button">Submit</button>
                </div>
            </div>   
        </div>
        }
    </>
    )
    
}

export default Modal