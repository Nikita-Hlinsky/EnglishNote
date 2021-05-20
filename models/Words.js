const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    word: {type: String},
    translate: {type: String},
    completed: {type: Number},
})

module.exports = model('Words', schema)