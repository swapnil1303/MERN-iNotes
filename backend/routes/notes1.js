const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
// Route 1 : get all notes for logged in user using Get /api/notes/fetchallnotes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
    
})

// Route 2 : add nodes Post: /api/notes/addnote

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 2 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const title = req.body.title;
        const description = req.body.description;
        const tag = req.body.tag;
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        // console.log(note);
        note.save();
        res.json({msg:"done"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})
module.exports = router;