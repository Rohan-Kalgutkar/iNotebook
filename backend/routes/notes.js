
const express = require('express');

const router = express.Router();

var fetchuser = require('../middleware/fetchUser');

const Note = require('../models/Note');

const { body, validationResult } = require('express-validator');
//Route 1: Get all the nores using: GET "/api/auth/getuser". Login Required



router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id })

        res.json(notes)

    } catch (error) {

        console.error('Error during user creation:', error.message);
        res.status(500).send("Internal Server Error Occurred");

    }




    // res.json(obj)

})

//Route 2: Add a new Note using: POST "/api/auth/addnote". Login Required



router.post('/addnote', fetchuser, [



    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    // body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),




], async (req, res) => {

    try {



        const { title, description, tag } = req.body;

        //If there are errors, return Bad request and the erros
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id

        })

        const savedNote = await note.save();
        // const notes = await Notes.find({ user: req.user.id })

        res.json(savedNote)

    } catch (error) {

        console.error('Error during user creation:', error.message);
        res.status(500).send("Internal Server Error Occurred");


    }

    // res.json(obj)

})



//Route 3: Update an exisiting Note using: PUT "/api/notes/updatenote". Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {


    const { title, description, tag } = req.body;

    try {
        
   
    //Create a newNote object

    const newNote = {};

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };


    // Find the note to be updated and update it

    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {

        return res.status(401).send("Not Allowed");


    }


    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

    res.json({ note });

} catch (error) {

    console.error('Error during user creation:', error.message);
    res.status(500).send("Internal Server Error Occurred");
        
}



})




//Route 4: Delete an exisiting Note using: DELETE "/api/notes/deletenote". Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    // const { title, description, tag } = req.body;


    // Find the note to be deleted and delete it

    try {
        
   

    let note = await Note.findById(req.params.id);

    if (!note) { return res.status(404).send("Not Found") }


    // Allow deletion only if user owns this Note



    if (note.user.toString() !== req.user.id) {

        return res.status(401).send("Not Allowed");


    }


    note = await Note.findByIdAndDelete(req.params.id)

    res.json({ "Success": "Note has been deleted", note:note });

} catch (error) {
        
    console.error('Error during user creation:', error.message);
    res.status(500).send("Internal Server Error Occurred");
}
})




module.exports = router