const express = require('express')
const connectToMongo=require('./db.js');

connectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Working fine!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})