const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log(url);

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(result => {
  console.log(result)
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })