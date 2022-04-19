const notes = require('express').Router();
// const notes = require('../db/db.json');

// const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if ( req.body ) {
    const newNotes = {
      noteTitle,
      noteText,
      id: uuidv4(),
    };

    // console.log(newNotes);
    readAndAppend(newNotes, './db/db.json');
    res.json(`Updated`);

    // const response = {
    //   status: 'success',
    //   body: newNotes,
    // };

    // res.json(response);
  } else {
    res.error(`Error in posting notes`);
  }
});

notes.delete('/:id', (req, res) => {
  const Id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== Id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${Id} has been deleted 🗑️`);
  });
});


module.exports = notes;