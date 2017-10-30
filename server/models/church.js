const mongoose = require('mongoose')
const Schema = mongoose.Schema
let churchSchema = new Schema ({
  name: {type:String, required: [true, '{PATH} must be filled']},
  location: {
    lng: String,
    lat: String
  },
  pastor: String,
  contact: {
    name: String,
    role: String,
    phone: {
      type: String,
      validate: {
        validator: function(val){ return /^\+[0-9]{10,32}/gi.test(val) },
        message: `{PATH} must be between 10 and 32 char length and starts with +`
      }
    }
  },
  est: Date,
  motto: String
})

let Church = mongoose.model('Church', churchSchema)
module.exports = Church