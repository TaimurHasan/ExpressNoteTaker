const fs = require('fs');
const { validateNote, createNewNote, filterOutId, pushFilteredArray } = require('../lib/notes');
let db = require('../db/db.json');
const { create } = require('domain');

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

test('checks if function creates a new note', () => {
    const note = {
        title: 'test note',
        text: 'this is a test note'
    };

    const newNote = createNewNote(note, db);

    expect(newNote.title).toBe('test note');
    expect(newNote.text).toBe('this is a test note');
});

test('check if id is filtered out correctly', () => {
    const noteArray = 
    [   
        {
            title: 'Note to delete',
            text: 'Should not remain',
            id: 1
        },
        {
            title: 'Note to keep',
            text: 'Should remain',
            id: 2
        }
    ];

    const result = filterOutId(1, noteArray);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Note to keep');
})