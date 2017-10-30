const mongoose = require('mongoose')
const Schema = mongoose.Schema

let helper = require('../helpers/login')
let staffSchema = new Schema ({
  email: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val) {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(val)},
      message: 'invalid {PATH} format'
    },
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val){ return /.{8,20}/.test(val)},
      message: `{PATH}'s length must be between 8 and 20 char`
    }
  },
  username: {
    type: String,
    required: [true, '{PATH} must be filled']
  }
})

staffSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this._doc.password = helper.hashPassword(this._doc.password)
  next()
})

let Staff = mongoose.model('Staff', staffSchema)
module.exports = Staff