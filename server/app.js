require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 3000
let index = require('./routes/index')
let komsel = require('./routes/komsel')
let church = require('./routes/church')
let user = require('./routes/user')
let achievement = require('./routes/achievement')
let staff = require('./routes/staff')
let game = require('./routes/game')
let badge = require('./routes/badge')
let room = require('./routes/room')
let deck = require('./routes/deck')
let request = require('./routes/request')
// let requestExit = require('./routes/requestExit')
let reward = require('./routes/reward')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())

app.use('/', index)
app.use('/user', user)
app.use('/achievement', achievement)
app.use('/staff', staff)
app.use('/game', game)
app.use('/badge', badge)
app.use('/komsel', komsel)
app.use('/church', church)
app.use('/room', room)
app.use('/deck', deck)
app.use('/request', request)
app.use('/reward', reward)

let envi = app.settings.env || 'development'

let db_config = {
  // 'development': 'mongodb://localhost/torch'
  'development': "mongodb://pdvega:1234@cluster0-shard-00-00-sftdy.mongodb.net:27017,cluster0-shard-00-01-sftdy.mongodb.net:27017,cluster0-shard-00-02-sftdy.mongodb.net:27017/torch?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
}

mongoose.connect(db_config[envi],(err,res) => {
  console.log(db_config[envi])
  console.log(err?err:'Berhasil connect ke db '+db_config[envi])
})

app.set('port', port)

app.listen(app.get('port'), () => {
  console.log('magic happen at port:',app.get('port'))
})

module.exports = app
