const mongoose = require('mongoose')
const Schema = mongoose.Schema
let badgeSchema = new Schema ({
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  image: String,
  poin: {type: Number, default: 0}
})

let Badge = mongoose.model('Badge', badgeSchema)
module.exports = Badge