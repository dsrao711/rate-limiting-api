const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')


// Environment variables 

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async(req, res) => {

    try {

        console.log("Fetching data from API ...")

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_NAME,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE}?${params}`)
        const data = apiRes.body
        console.log(data)
        res.status(200).json(data)


    } catch (error) {

        res.status(500).json(error)

    }

})

module.exports = router