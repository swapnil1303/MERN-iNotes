import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';
const NoteItem = (props) => {
    const { note, updateNote, showAlert } = props;
    const context = useContext(noteContext);
    const {deleteNote}= context;
    return (
        <>
            <div className='col-md-4'>
                <div className="card my-3" style={{width:"16rem"}}>
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-trash-can mx-3" onClick={()=>deleteNote(note._id,showAlert)}></i>
                            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>updateNote(note,showAlert)}></i>
                        </div>
                        <p className="card-text" style={{color:'white',backgroundColor:'black',borderRadius:'10px',padding:'10px'}}>{note.description}</p>
                        <p className="card-text" style={{background:'#8282966b',color:'black',padding:'10px', borderRadius:'10px',textAlign:'center'}}>{note.tag}</p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem