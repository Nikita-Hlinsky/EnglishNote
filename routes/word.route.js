const {Router} = require('express')
const router = Router()
const Words = require('../models/Words')

router.post('/add', async (req, res) => {
    try {
        const {word, translate, userId} = req.body

        // поправить название
        const word1 = await new Words({
            word,
            translate,
            owner: userId,
            important: false
        })

        await word1.save()
        res.json(word1)

    } catch (error) {
        console.log(error);
    }
})

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query

        const word = await Words.find({owner: userId})
        res.json(word)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const word = await Words.findByIdAndDelete({_id: req.params.id})
        res.json(word)
    } catch (error) {
        console.log(error);
    }
})

router.put('/completed/:id', async (req, res) => {
    try {
        const word = await Words.findOne({_id: req.params.id})
        word.completed = !word.completed

        await word.save()
        res.json(word)
    } catch (error) {
        console.log(error);
    }
})

// router.put('/important/:id', async (req, res) => {
//     try {
//         const todo = await Todo.findOne({_id: req.params.id})
//         todo.important = !todo.important

//         await todo.save()
//         res.json(todo)
//     } catch (error) {
//         console.log(error);
//     }
// })


module.exports = router