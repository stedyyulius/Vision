let Room = require('../models/room')
let User = require('../models/user')
let Game = require('../models/game')
let Komsel = require('../models/komsel')

const getRooms = (req, res) => {
  let id = req.params.id
  Room.find((err, rooms) => {res.send(err? {err:err} : rooms)})
}

const getRoom = (req, res) => {
  let id = req.params.id
  Room.findById(id, (err, room) => {
    res.send(err? {err:err}: room)
  })
}

const addRoom = (req, res) => {
  // User.findOne({email: req.body.email}, (err,user)=> {
    // if (err) res.send({err:'Invalid User'})
    // else if (user !== null) {
      // let id = user._id
      let rules = {}
      let offline = {}

      if (typeof req.body.maxUser != 'undefined') rules.maxUser = req.body.maxUser
      if (typeof req.body.maxRegis != 'undefined') rules.maxRegis = Date(req.body.maxRegis)
      if (typeof req.body.minUser != 'undefined') rules.minUser = req.body.minUser
      if (typeof req.body.lat != 'undefined') {
        offline.location = {
          lat: req.body.lat,
          lng: req.body.lng,
          name: req.body.name,
        }
        if (typeof req.body.time != 'undefined') offline.time = Date(req.body.time)
        if (typeof req.body.description != 'undefined') offline.description = req.body.description

        rules.offline = offline
      }
      // Komsel.findById(req.body.creator_komsel,(err,komsel)=>{
        // if (err) res.send({err:err})
        // else {
          let room = {
            _game: req.body.game || '',
            isOnline: req.body.isOnline,
            name: req.body.name || 'no name room',
            image: req.body.image ||'',
            tipe: req.body.tipe || 'competition', //event ato competition
            creator: req.body.creator || '',
            createdDate: new Date().toLocaleDateString('id').split('T')[0],
            descr: req.body.descr || ''
          }

          if (!(Object.keys(rules).length === 0 && rules.constructor === Object)) room.rules = rules

          let n_room = new Room(room)

          n_room.save((err, n_room) => {
            if (err) {
              let err_msg = []
              for (let error in err.errors) err_msg.push(err.errors[error].message)
              res.send({err : err_msg.join(',')})
            } else res.send(n_room)
          })
        // }
      // })


    // } else res.send({err:'User not found'})
  // })
}

const deleteRoom = (req, res) => {
  let id = req.params.id

  Room.findById(id, (err, room) => {
    if(err) res.send({err: 'Invalid Room'})
    else room.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editRoom = (req, res) => {
  Room.findById(req.params.id, (err,room) => {
    if (err) res.send({err:err})
    else {
      if (typeof req.body.isOnline !== 'undefined') room.isOnline = req.body.isOnline
      if (typeof req.body.image2 !== 'undefined') room.image2 = req.body.image2

      room.save((err,room) => {
        res.send(err?{err:err} :room)
      })
    }
  })
}

const searchRoom = (req, res) => {
  let type = req.params.type
  let isOnline = type === 'online'

  Room.find({isOnline:isOnline})
  // .populate('_game creator._komsel')
  // .populate({
  //   path: 'creator._user',
  //   select: 'name _id'
  // })
  .exec((err,rooms) => {
    res.send(err? {err:err} : rooms)
  })

}

// const getOpenRoom = (req, res) => {}

const editStatusPlayer = (req, res) => {
  // User.findOne({email:req.body.email}, (err, user)=>{
    // if (err) res.send({err:err})
    // else {
      let winner = req.body.winner //komsel
      Room.findById(req.params.id, (err, room)=> {
        if (err) res.send({err:err})
        else if (room === null) res.send({err:'room not found'})
        else {
          room._winner = winner

              // Game.findById(room._game, (err,game) => {
                // if (err) res.send({err:'Game not found'})
                // else {
                  let poin = room.poin
                  Komsel.findById(room._winner, (err, komsel) => {
                    if (err) res.send({err:'Komsel not found'})
                   else if(komsel === null) res.send({err:'Komsel not found'})
                    else {
                      if (typeof komsel.poin === 'undefined') komsel.poin = 0
                      komsel.poin = komsel.poin + poin
                      if (typeof komsel.poinHistory === 'undefined') komsel.poinHistory = []

                      komsel.poinHistory.push({
                        poin: komsel.poin,
                        descr: 'Winning game',
                        tag: 'add'
                      })

                      room.winnerKomselName = komsel.name

                      komsel.save((err,komsel) => {
                        if (err) res.send({err:err})
                        else
                          room.save((err,room) => {
                            if (err) {
                              res.send({err:err})
                            } else res.send(room)
                          })
                      })
                    }
                  })
                // }

              // })
          //   }
          // })
        }
      })
    // }
  // })

}

const addPlayer = (req, res) => {
  //add player ke room
  //add poin ke player
  // let email = req.body.email
  let name = req.body.name
  let roomId = req.params.id

  // User.findOne({email: email}, (err,user)=> {
    // if (err) res.send({err:'Invalid user'})
    // else {
  // let id = user._id
  Room.findById(roomId, (err, room) => {
    if (err) res.send({err:'Room not found'})
    else {
      if (typeof room.players === 'undefined') room.players = []
      room.players.push(name)
      // room.players = []
      room.save((err,room) => {
        if (err) res.send({err:err})
        else {
          // user.poin = user.poin + 10
          // user.save((err, user)=> {
            res.send(err? {err:err} : room)
          // })
        }
      })
    }
  })

    // }

  // })
}

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  deleteRoom,
  editRoom,
  searchRoom,
  // getOpenRoom,
  editStatusPlayer,
  addPlayer

}