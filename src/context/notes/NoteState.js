import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // function for fetching all notes

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      const json = await response.json();
      setNotes(json);
      console.log(json);
    }
    catch (error) {
      console.log(error);
    }
  }

  // function for addnotes
  const addNote = async (title, description, tag) => {
    try {
      console.log("Adding new note");
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      });
      //   return response.json();
      // console.log(response);
      const json = await response.json();
      console.log(json);
      const note = json;

      setNotes(notes.concat(note));

    } catch (error) {
      console.log(error);
    }

  }
  // function for deletenotes
  const deleteNote = async (id, showAlert) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      console.log(response);
      // deleting
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
      console.log("deleting " + id);
      showAlert("Deleted note successfully", "success");
    } catch (error) {
      console.log(error);
      showAlert("Internal server error while deleting", "danger");
    }
    // id="6529467b0b8e9dd8c860a788";

    // deleting


  }
  // function for edit notes
  const editNote = async (id, title, description, tag, showAlert) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      console.log(response);
      //   return response.json();
      let newnotes = JSON.parse(JSON.stringify(notes));
      for (let idx = 0; idx < notes.length; idx++) {
        const element = newnotes[idx];
        if (element._id === id) {
          newnotes[idx].description = description;
          newnotes[idx].title = title;
          newnotes[idx].tag = tag;
          break;
        }
      }
      showAlert("Updated note successfully", "success");
      setNotes(newnotes);


    } catch (error) {
      console.log(error);
      showAlert("Internal server error while editing", "danger");
    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;