const path = require('path');
const db = require('../../db/db.json');
const router = require('express').Router();
const { validateNote, createNewNote } = require('../../lib/notes');

// for random id generation, using crypto node module
const crypto = require('crypto');

router.get('/notes', (req, res) => {
    let results = db;
    res.json(results);
})

router.post('/notes', (req, res) => {
    // assigning random id to note
    let id = crypto.randomBytes(16).toString('hex');
    req.body.id = id;
    
    // validate if note has title and text (extra layer of validation)
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted!');
    } else {
        const note = createNewNote(req.body, db);
        res.json(note);
        console.log(db);
    }


})

module.exports = router