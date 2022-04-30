const fs = require('fs');
const path = require('path');
let db = require('../db/db.json');

// function to check if note has title and text (should not need as front-end save button does not appear until filled - added security)
function validateNote(note) {
    if(!note.title) {
        return false;
    }

    if(!note.text) {
        return false;
    }

    return true;
}

// takes new note object and pushes it into the notes array and writes it into db.json file
function createNewNote(body, noteArr) {
    const note = body;
    noteArr.push(note);

    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify(noteArr, null, 2)
    );

    return note;
}

// filter out the selected id for use when deleting
function filterOutId(id, noteArr) {
    const result = noteArr.filter(note => note.id !== id)
    db = result;
    return result;    
}

// push newly filtered array (after id filtered out) to db.json file
function pushFilteredArray(noteArr) {
    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify(noteArr)
    );
}

module.exports = {
    validateNote,
    createNewNote,
    filterOutId,
    pushFilteredArray
}