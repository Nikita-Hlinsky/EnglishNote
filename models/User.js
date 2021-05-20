const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
    full_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    words: [{type: Types.ObjectId, ref: 'Words'}]
})

module.exports = model('User', schema)