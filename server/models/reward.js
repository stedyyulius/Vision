const mongoose = require('mongoose')
const Schema = mongoose.Schema
let rewardSchema = new Schema ({
  poin: {type: Number, default: 250},
  descr: {
    note: String,
    image: String
  },
  // rules: {
  //   startDate: {type: Date, default: Date.now},
  //   endDate: Date,
  //   quota: Number,
  //   duration: Number,
  // },
  isActive: {type: Boolean, default: true}
})

let Reward = mongoose.model('Reward', rewardSchema)
module.exports = Reward