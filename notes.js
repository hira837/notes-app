const fs = require('fs')
const chalk = require("chalk");

const getYourName = function() {
  return 'Success!'
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const dupilicateNotes = notes.filter((note) => note.title === title)

  if(dupilicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log('New note added!')
  } else {
    console.log('Note title taken!')
  }

}

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notesToKeep.length !== notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  getYourName: getYourName,
  addNote: addNote,
  removeNote: removeNote
};