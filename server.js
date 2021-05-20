const express = require('express')
// const {Router} = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('qwertyu')
})


app.listen(5000)


