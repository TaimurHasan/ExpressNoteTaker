const fs = require('fs');
const { validateNote, createNewNote, filterOutId, pushFilteredArray } = require('../lib/notes');
let db = require('../db/db.json');

jest.mock('fs');

test('validates that a note contains required fields', () => {
    const validNote = {
        title: 'valid note',
        text: 'this note is valid'
    };

    const invalidNote = {
        title: 'invalid note'
    };

    const validResult = validateNote(validNote);
    const invalidResult = validateNote(invalidNote);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false); 
});