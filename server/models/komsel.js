const mongoose = require('mongoose')
const Schema = mongoose.Schema

let komselSchema = new Schema ({
  image: String,
  map_image: String,
  name: {type: String, required: [true, `{PATH} must be filled`]},
  isApproved: {type: Boolean, default: false},
  approvedBy: {type: Schema.Types.ObjectId, ref: 'Staff'},
  createdDate: {type: Date, default: Date.now},
  theme: String,
  ayat: String,
  location: {
    lng: String,
    lat: String,
    city: String
  },
  popularity: {
    score: {type: Number, default: 0},
    totalVote: {type: Number, default: 0},
    totalScore: {type: Number, default: 0},
  },
  // badge: {
  //   descr:{type: Schema.Types.ObjectId, ref: 'Badge'},
  //   unlockDate: {type: Date, default: Date.now}
  // },
  poin: {type: Number, default: 0},
  poinHistory: [{
    poin: Number,
    descr: String,
    tag: {
      type: String,
      enum: {
        values: ['add', 'subtract'],
        message: `{PATH} should be [add | subtract]`
      }
    }
  }],
  // playHistory: [{type: Schema.Types.ObjectId, ref: 'Room'}],
  achievement: [{
    image: {type:String, default: 'https://i.imgur.com/j7QZ4c0.png'},
    descr: String,
    title: String,
    createdDate: {type:Date, default: Date.now},
    poin: Number
  }],
  member: [
    {
      _member: {
        name: String,
        poin: {type: Number, default: 0},
        profile_picture: String
        // profile_picture: String
      },
      // _member: {type: Schema.Types.ObjectId, ref: 'User'},
      role: String,
      joinDate: {type: Date, default: Date.now}
    }
  ],
  _creator: {type: Schema.Types.ObjectId, ref: 'User'},
  _leader: {type: Schema.Types.ObjectId, ref: 'User'},
  _church: {type: Schema.Types.ObjectId, ref: 'Church'}
})

let Komsel = mongoose.model('Komsel', komselSchema)
module.exports = Komsel