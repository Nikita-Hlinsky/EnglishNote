const express = require('express')
const mongoose = require('mongoose')


const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))

async function start() {
    try {
        mongoose.connect('mongodb+srv://admin:5d7B5bdB9iW3rTLX@cluster0.vnevb.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()

// app.get('/', (req, res) => {
//     res.status(200).send('qwertyu')
// })

// app.get('/main', (req, res) => {
//     res.send({type:"GET"})
// })


