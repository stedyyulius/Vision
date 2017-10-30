const mongoose = require('mongoose')
const Schema = mongoose.Schema
let requestExitKomselSchema = new Schema ({
  _komsel: {type: Schema.Types.ObjectId, ref: 'Komsel'},
  _requestor: {type: Schema.Types.ObjectId, ref: 'User'},
  createdDate: {type: Date, default: Date.now}
})

let RequestExitKomsel = mongoose.model('RequestExitKomsel', requestExitKomselSchema)
module.exports = RequestExitKomsel