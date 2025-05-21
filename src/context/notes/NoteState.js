import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const s1= {
  //     "name":"Rohan",
  //     "class":"5b"
  // }


  // const [state, setState]=useState(s1);

  // const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Ron",
  //             "class":"10b"
  //         })
  //     },1000);
  // }

  const host = "http://localhost:5001"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



   //Get all Notes
   const getNotes = async() => {

    // const data = { title, description, tag };
    const url = `${host}/api/notes/fetchallnotes`;
    console.log("Adding a new note")


    //API Call

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
      // body: JSON.stringify(data)
    });
const json=await response.json()
    console.log(json)

    setNotes(json)

    // const json = await response.json();
    // console.log(json)

  }



  //Add a Note
  const addNote = async(title, description, tag) => {

    const data = { title, description, tag };
    const url = `${host}/api/notes/addnote`;
    console.log("Adding a new note")

    //ToDO: API Call

    //API Call

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    const note = await response.json();
    setNotes(notes.concat(note))

    
  }

  //Delete a Note

  const deleteNote = async(id) => {

    //API Call


    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      // body: JSON.stringify(data)
    });

    const json = await response.json();
    console.log(json)





    console.log("Deleting the note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)


  }

  //Edit a Note

  const editNote = async (id, title, description, tag) => {
    const data = { title, description, tag };

    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    console.log(json)




    let newNotes=JSON.parse(JSON.stringify(notes))

    //Logic to edit in client

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    console.log(id,newNotes);
    setNotes(newNotes);


  }

  return (


    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;