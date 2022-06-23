// node modules
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')
// local modules
const feed = require('./routes/feed')
const search = require('./routes/search')

// init express app
const app = express()

// use cors middleware for cross-origin resource sharing
app.use(cors())
// use express json middleware for body parse
app.use(express.json())
// use serve-favicon to prevent favicon request param
app.use(favicon(path.join(__dirname, './', 'favicon.ico')))

// setup routing
app.get('/', feed)
app.get('/:text/:perPage/:page', search)

// setup port
const PORT = process.env.PORT || 4000
// start listening
app.listen(PORT, console.log(`listen on port ${PORT}`))
