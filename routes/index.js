const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')


// Environment variables 

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// init cache

let cache = apicache.middleware


router.get('/', cache('2 minutes'), async(req, res) => {

    try {
        // Query params
        const params = new URLSearchParams({
                [API_KEY_NAME]: API_KEY_VALUE,
                ...url.parse(req.url, true).query,
            })
            // URL with the base url , api key and the query
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body

        // Log the request to the public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        // Display data on success
        res.status(200).json(data)

    } catch (error) {
        // Display error
        res.status(500).json(error)

    }

})

module.exports = router