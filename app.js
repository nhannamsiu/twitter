"use strict"
const express = require('express')
const bodyParser = require('body-parser')
const querystring = require('querystring')

let app = express()
const port = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/app', express.static('./app'))

app.listen(port, async() => {
  console.log(`Server listening on port ${port}!`)
})

app.get('/', async(req,res) => {
  res.sendFile(__dirname + '/app.html')
})


//truffle build file
app.get('/app/artifact.js', async(req,res) => {
  let artifact = require('./build/contracts/Twitter.json')
  res.send('let artifact = ' + JSON.stringify(artifact))
})
