const fs = require('fs')
const chalk = require("chalk");

const getYourName = () => {
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
  const noteToRead = notes.filter((note) => note.title === title)
  console.log(noteToRead)
  if(noteToRead.length) {
    console.log(noteToRead)
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
  getYourName: getYourName,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};