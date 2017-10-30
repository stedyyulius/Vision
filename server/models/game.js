const mongoose = require('mongoose')
const Schema = mongoose.Schema
let gameSchema = new Schema ({
  isOnline: {type: Boolean, required: [true, `{PATH} must be filled`]},
  creator: String,
  name: {type: String, required: [true, `{PATH} must be filled`]},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  poin: {type: Number, default: 0},
  image: String
})

let Game = mongoose.model('Game', gameSchema)
module.exports = Game