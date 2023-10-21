import React, { useEffect, useRef, useState } from 'react'

// import { useEffect } from 'react';
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import { Addnote } from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate=useNavigate();

    const context = useContext(noteContext);

    const { notes, getNotes,editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'));
            getNotes(); 
            console.log('user authenticated');
        }
           else{
            navigate('/login');
           }   
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose=useRef(null);
    
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })

    const updateNote = (currNote) => {
        console.log("updating " + currNote._id);
        ref.current.click();
        setNote({
            id:currNote._id,
            etitle: currNote.title,
            edescription: currNote.description,
            etag: currNote.tag
        });
        // props.showAlert("Updated notes successfully","success");
        
    }

    const handleEdit = (e) => {
        // console.log("editing now ",note);
        // e.prevent.default();
        console.log("checking handleEdit",note)
        ref.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag,props.showAlert);
        // e.prevent.default();
        // props.showAlert("Edited notes successfully","success");
        // e.preventDefault();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    // const date= new Date();
    // const getId=()=>{
    //     return date.getMilliseconds;
    // }
    return (
        <>
            <Addnote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard Changes</button>
                            <button ref={refClose}  disabled={ note.etitle.length===0 || note.edescription<5 }type="button" className="btn btn-primary" onClick={handleEdit} >Update my note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your notes</h1>
                <div className="container mx-2">
                {notes.length===0 && 'Wohoooo... Nothing leftt'}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} updateNote={updateNote} key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes