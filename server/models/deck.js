const mongoose = require('mongoose')
const Schema = mongoose.Schema
let deckSchema = new Schema ({
  _game: {type: Schema.Types.ObjectId, ref: 'Game'},
  question: {type: String, required: [true, `{PATH} must be filled`]},
  image: String,
  answer: {type: String, required: [true, `{PATH} must be filled`]},
})

let Deck = mongoose.model('Deck', deckSchema)
module.exports = Deck