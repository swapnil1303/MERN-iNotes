const express = require('express')
const connectToMongo=require('./db.js');

connectToMongo();
var cors = require('cors')
var app = express()

app.use(cors())
const port = 5000

// Available routes

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Working fine!')
})
app.use('/api/auth',require('./routes/auth.js'))

app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`iNoteBook - Backend listening on port http://localhost:${port}`)
})