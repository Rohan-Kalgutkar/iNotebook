import React, { useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {  useNavigate  } from 'react-router-dom';

const Notes = (props) => {

  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getNotes,editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }
    else{
      navigate("/login")

    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {

    console.log("updateNote called with note:", note);

    console.log("Ref current:", ref.current);

    ref.current.click();

    setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})

  }

  const ref = useRef(null)

  const refClose = useRef(null)

  const [note,setNote]=useState({id:"",etitle:"", edescription:"",etag:"default"})

  const handleClick=(e)=>{

    console.log("Updating the Note...",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated Successfully","success");

    // e.preventDefault();

    refClose.current.click();


    

}

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

}

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>





      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}onClick={handleClick}type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>




      <div>
        <div className="row my-3">
          <h1>Your notes</h1>
          <div className="container mx-1">
          {notes.length===0 && 'No Notes to display'}
          </div>

          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          })}


        </div>

      </div>
    </>
  )
}

export default Notes
