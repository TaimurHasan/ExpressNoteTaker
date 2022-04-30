const path = require('path');
let db = require('../../db/db.json');
const router = require('express').Router();
const { validateNote, createNewNote, filterOutId, pushFilteredArray } = require('../../lib/notes');

// for random id generation, using crypto node module
const crypto = require('crypto');

router.get('/notes', (req, res) => {
    let results = db;
    res.json(results);
})

// allow user to use the post method on the api call to save notes to the database
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
    }
})

// allows user to use delete method on api call to delete selected note
router.delete('/notes/:id', (req, res) => {
    // filter out the note which has a matching id to request parameter
    let filteredArray = filterOutId(req.params.id, db);

    // saving database as new filtered array for use in other parts of code
    db = filteredArray;

    // saving new array in the db.json file
    pushFilteredArray(filteredArray);
    res.json(filteredArray);
})

module.exports = router