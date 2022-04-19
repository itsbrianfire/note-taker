const express = require('express');
const notes = require('../db/db.json');
// const notes = require('../db/db.json').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const app = express();

notes.use(express.json());
notes.get('/', (req, res) => {});

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
  const { activeNote, noteListItems, notes } = req.body;

  if (activeNote && noteListItems && notes) {
    const newNotes = {
      activeNote,
      noteListItems,
      notes_id: uuidv4(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});