const mongoose = require('mongoose')
const Schema = mongoose.Schema
let roomSchema = new Schema ({
  name: String,
  isOnline: {type: Boolean, required: [true, `{PATH} must be filled`]},
  creator: String,
  name: {type: String, required: [true, `{PATH} must be filled`]},
  descr: {type: String, required: [true, `{PATH} must be filled`]},
  poin: {type: Number, default: 0},
  _winner: {type: Schema.Types.ObjectId, ref: 'Komsel'},
  winnerKomselName: String,
  // _creatorKomsel: {type: Schema.Types.ObjectId, ref: 'Komsel'},
  // creatorKomselName: String,
  rules: {
    maxUser: Number,
    minUser: Number,
    offline: {
      location: {
        lat: String,
        lng: String,
        name: String
      },
      time: Date,
      referee: {type: Schema.Types.ObjectId, ref: 'Staff'},
      description: String
    },
    maxRegis: Date
  },
  createdDate: String,
  image:String,
  image2:String,
  players: [String],
  tipe: String //event sama kompetisi
})

let Room = mongoose.model('Room', roomSchema)
module.exports = Room