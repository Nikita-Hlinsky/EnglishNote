const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const {Router} = require('express')
const router = Router()

router.get("/registration", [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').isLength({min: 8})
], (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid registration"
            })
        }

        const { email, password } = req.body

        const isUsed = await User.findOne({ email })
        if (isUsed) {
            return res.status(300).json({message: 'This email alredy choosen, try another.'})
        }

        // const hashedPassword = await bcrypt.
        

        const user = new User({
            email, password
        })

        await user.save()

        res.status(201).json({ message: 'User is created correct.' })

    } catch (err) {
        console.log(err);
    }
})

router.get("/login", [

], (req, res) => {

})
