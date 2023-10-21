const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route 1:  get all notes using get /api/auth/fetchallnotes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });

        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error occured');
    }


})
//Route 2:  adding note using get /api/auth/addnote

router.post('/addnote', fetchuser,
    [body('title', 'enter valid title').isLength({ min: 2 }),
    body('description', 'enter valid description').isLength({ min: 5 })]
    , async (req, res) => {
        try {
            const errors = validationResult(req);
            const { title, description, tag } = req.body;
            if (!errors.isEmpty()) {
                res.send(errors);
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNode = await note.save();
            res.json(savedNode);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('some error occured');
        }
        // const notes = await Note.find({ user: req.user.id });


    })
// Route 3 : update existing node 

router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const {title, description,tag}= req.body;
        // create new node obj
        const newNote={};
        if(title) {newNote.title=title};
        if(description) {newNote.description=description};
        if(tag) {newNote.tag=tag};
        var note=await Note.findById(req.params.id)
        if(!note) return res.status(404).send('Not found');
        if(note.user.toString()!== req.user.id){
            return res.status(401).send('not allowed');
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    })
    // Route 3 : delete existing node using delete /api/notes/deletenode login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const {title, description,tag}= req.body;
    // create new node obj
    let note=await Note.findById(req.params.id)
    if(!note) return res.status(404).send('Not found');
    if(note.user.toString()!== req.user.id){
        return res.status(401).send('not allowed');
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted successfully",note:note});
})
module.exports = router;