const fs = require('fs')
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes()
  const dupilicateNote = notes.find((note) => note.title === title)

  if (!dupilicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }

}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notesToKeep.length !== notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes()
  // const notesTitle = notes.map((note) => note.title)
  // console.log(chalk.red.inverse(notesTitle))
  // return notesTitle
  notes.forEach((note) => {
    console.log(chalk.inverse(note.title))
  })
}

const readNotes = (title) => {
  const notes = loadNotes()
  console.log('reding note')
  const noteToRead = notes.find((note) => note.title === title)
  if(noteToRead) {
    console.log(noteToRead.title)
    console.log(noteToRead.body)
    console.log(chalk.green.inverse("Note read"))
  } else {
    console.log(chalk.red.inverse("Note is not read"))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};