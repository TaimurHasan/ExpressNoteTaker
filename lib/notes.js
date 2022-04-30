const fs = require('fs');
const path = require('path');
let db = require('../db/db.json');

function validateNote(note) {
    if(!note.title) {
        return false;
    }

    if(!note.text) {
        return false;
    }

    return true;
}

function createNewNote(body, noteArr) {
    const note = body;
    noteArr.push(note);

    fs.writeFileSync(
        path.join(__dirname,'../db/db.json'),
        JSON.stringify(noteArr, null, 2)
    );

    return note;
}

function filterOutId(id, noteArr) {
    const result = noteArr.filter(note => note.id !== id)
    db = result;
    return result;    
}

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