const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// If a port is available or else port number 5000 
const PORT = process.env.PORT || 5000

const app = express()

// Rate limiting (To limit the number of requests sent)

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 5 // Number of reqs in 1 min
})
app.use(limiter)
app.set('trust proxy', 1)

// Routes
app.use('/api', require('./routes'))

// Enable cors
app.use(cors())

// Set static folder
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))