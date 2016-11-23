// server.js
const express = require('express')
const path = require('path')
const port = process.env.PORT || 5050
const app = express()

const pathElements = path.parse(__dirname);

const tgtPath = pathElements.dir + '/build'
// serve static assets normally
app.use(express.static(tgtPath))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(tgtPath, 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)