const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwtToken = require('jsonwebtoken')

router.post("/registration", [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').isLength({min: 8})
], 
async (req, res) => {
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

router.post('/login',
    [
        check('email', 'Invalid Email').isEmail(),
        check('password', 'Invalid Password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid registration"
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message:'This email is not exist'})
            }

            const isMatch = password === user.password
            
            if (!isMatch) {
                return res.status(400).json({message:'Invalid mail or password'})
            }

            const jwtSecret = 'ehwvbfnvu28erbuvr831fb3fwfqjfhod'
            const token = jwtToken.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})


        } catch (err) {
            console.log(err);
        }
})

module.exports = router;