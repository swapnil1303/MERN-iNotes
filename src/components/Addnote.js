import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
export const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note,setNote] = useState({title:"title",description:"description",tag:"personal"})
    const handleAdd=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Added notes successfully","success");

    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3 d-flex justify-content-center flex-column">
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name="description" id="description" onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name="tag" id="tag" onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<0 || note.description.length<0} type="submit" className="btn btn-primary" onClick={handleAdd}>Add to my notes</button>
                </form>
            </div>
        </div>
    )
}
