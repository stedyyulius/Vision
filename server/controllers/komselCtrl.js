let Komsel = require('../models/komsel')
let Staff = require('../models/staff')
let User = require('../models/user')
let Badge = require('../models/badge')

let RequestJoinKomsel = require('../models/requestJoinKomsel')
let RequestExitKomsel = require('../models/requestExitKomsel')

let login = require('../helpers/login')

const getKomsels = (req, res) => {
  Komsel.find()
  .populate('_leader')
  .exec((err, komsels) => {
    res.send(err? {err:err}: komsels)
  })
}

const getKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id)
  .populate('_leader')
  .exec((err, komsel) => {
    // if (typeof komsel.badge !== 'undefined') {
    //   Badge.findById(komsel.badge.descr, (err, badge)=>{
    //     komsel.badge = {
    //       descr: badge,
    //       unlockDate: komsel.badge.unlockDate || ''
    //     }
        res.send(err? {err:err}: komsel)
    //   })
    // }
  })
}

const addKomsel = (req, res) => {
  let name = req.body.name
  // let decoded = login.getUserDetail(req.headers.token)
  // let user = decoded._id || ''
  // User.findOne({name: name}, (err,user)=>{
    let komsel = {
      name: req.body.name || '',
      username: req.body.username || '',
      location: {
        lng: req.body.lng || '',
        lat: req.body.lat || '',
        city: req.body.city || '',
      },
      _creator: req.body.user,
      _leader: req.body.user,
      _church: req.body.church || '',
      theme: req.body.theme || '',
      ayat: req.body.ayat || ''
    }

    // if (typeof req.body.badge !== 'undefined')
    // komsel.badge = {
    //   descr: req.body.badge
    // }

    let n_komsel = new Komsel(komsel)

    n_komsel.save((err, n_komsel) => {
      if (err) {
        let err_msg = []
        for (let error in err.errors) err_msg.push(err.errors[error].message)
        res.send({err : err_msg.join(',')})
      } else {
        res.send(n_komsel)
      }
    })
  // })

}

const deleteKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id, (err, komsel) => {
    if(err) res.send({err: 'Invalid Komsel'})
    else komsel.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id, (err, komsel) => {
    if (err) res.send({err: 'Invalid Komsel'})
    else {
      let location = komsel.location || {}
      if (typeof req.body.name !== 'undefined') komsel.name = req.body.name
      if (typeof req.body.theme !== 'undefined') komsel.theme = req.body.theme
      if (typeof req.body.poin !== 'undefined') komsel.poin = req.body.poin
      if (typeof req.body.ayat !== 'undefined') komsel.ayat = req.body.ayat
      if (typeof req.body.lng !== 'undefined') location.lng = req.body.lng
      if (typeof req.body.lat !== 'undefined') location.lat = req.body.lat
      if (typeof req.body.city !== 'undefined') location.city = req.body.city
      if (typeof req.body.image !== 'undefined') komsel.image = req.body.image
      if (typeof req.body.map_image !== 'undefined') komsel.map_image = req.body.map_image
      if (typeof req.body.church !== 'undefined') komsel.church = req.body._church
      if (typeof req.body.badge !== 'undefined') komsel.badge = {
        descr: req.body.bage
      }

      // komsel.member = komsel.member.filter((m)=> `${m._member.name}` !== 'Pella De Vega' )
      if (!(Object.keys(location).length === 0 && location.constructor === Object)) komsel.location = location
      komsel.save((err, komsel) => {
        res.send(err? {err:err} : komsel)
      })
    }
  })
}
//if admin
const approveKomsel = (req, res) => {
  let id = req.params.id
  // let decoded = login.getUserDetail(req.headers.token)

  // Staff.findById(decoded._id, (err, staff) => {
    // if (err) res.send({err: 'You dont have access'})
    // else {
      Komsel.findById(id, (err, komsel) => {
        if (err) res.send({err:'Invalid Komsel'})
        else if (komsel != null){
          komsel.isApproved = true
          // komsel.approvedBy = decoded._id
          komsel.save((err, approved_komsel) => {
            res.send(err? {err: err} : approved_komsel)
          })
        } else res.send({err: 'Invalid Komsel'})
      })
    // }
  // })
}

const editLeader = (req, res) => {
  // // let decoded = login.getUserDetail(req.headers.token)
  // // let user = decoded._id || ''
  //
  // // if (typeof req.body.leader === 'undefined') res.send({err:'Please choose the next leader'})
  // // else {
  //   // Komsel.findOne({_leader:user}, (err, komsel) => {
  //   //   if (err) res.send({err: 'You dont have access to change the leader'})
  //   //   else {
  //       komsel._leader = req.body.leader
  //       komsel.save((err, n_leader_komsel) => {
  //         res.send(err? {err: err} : n_leader_komsel)
  //       })
  //   //   }
  //   // })
  // // }
}

const editPopularity = (req, res) => {}

//sekalian update badge
const editPoin = (req, res) => {}
const addPlayHistory = (req, res) => {}

const addMember = (req, res) => {
  let id = req.params.idRequest

  RequestJoinKomsel.findById(id, (err, joinreq)=> {
    if (err) res.send({err:'Invalid request'})
    else {
      Komsel.findById(joinreq._komsel, (err, komsel) => {
        if (err) res.send({err: 'Komsel not exist'})
        else if (komsel === null) res.send({err: 'Komsel not exist'})
        else {
          if (typeof komsel.member === 'undefined') komsel.member = []

          let newMember =  {
            _member: {
                name: joinreq.request,
                poin: joinreq.poin || 0,
                profile_picture: joinreq.profile_picture || ''
              },
            // _member: joinreq._requestor,
            role: 'member'
          }


          komsel.member.push(newMember)
          komsel.save((err, n_komsel) => {
            if (err) res.send({err:err})
            else {
              joinreq.remove((err, deleted) => {
                res.send(err? {err:err} : deleted)
              })
              // User.findOne({name: joinreq.request}, (err, user)=> {
              //   if (err) res.send({err:err})
              //   else if(user === null) res.send({err: 'Invalid user'})
              //   else {
              //     if (typeof user.komsel === 'undefined') user.komsel = []
              //     user.komsel.push({
              //       _komsel: joinreq._komsel,
              //       role: 'member'
              //     })
              //     user.save((err, user) =>{
              //       joinreq.remove((err, deleted) => {
              //         res.send(err? {err:err} : deleted)
              //       })
              //     })
              //   }
              // })
            }
          })
        }
      })
    }
  })
}

const addAchievement = (req, res) => {
  let id = req.params.id
  Komsel.findById(id, (err, komsel) => {
    if (err) res.send({err:err})
    else if(komsel !== null){
      if (typeof komsel.achievement === 'undefined') komsel.achievement = []

      komsel.achievement.push({
        descr: req.body.descr || '',
        title: req.body.title || '',
        poin: req.body.poin || 0
      })

      // komsel.achievement = []

      komsel.save((err, komsel) => {
        res.send(err?{err:err} : komsel)
      })
    }
    else res.send({err:'Komsel not found'})
  })

}

const deleteMember = (req, res) => {
  let id = req.params.idRequest

  RequestExitKomsel.findById(id, (err, leavereq)=> {
    if (err) res.send({err:'Invalid request'})
    else if(leavereq === null) res.send({err:'Invalid Leave Request'})
    else {
      Komsel.findById(leavereq._komsel, (err, komsel) => {
        if (err) res.send({err: 'Komsel not exist'})
        else {
          if (typeof komsel.member === 'undefined') komsel.member = []
          // console.log(komsel.member[0])
          // let idx = komsel.member.findIndex( m =>  `${m._member}` == `${leavereq._requestor}`)

          // console.log(idx)

          komsel.member = komsel.member.filter( m =>  `${m._member}` !== `${leavereq._requestor}`)
          komsel.save((err, n_komsel) => {
            if (err) res.send({err:err})
            else {
              User.findById(leavereq._requestor, (err, user)=> {
                if (err) res.send({err:err})
                else {
                  if (typeof user.komsel === 'undefined') user.komsel = []

                  user.komsel = user.komsel.filter(k => `${k._komsel}` != `${leavereq._komsel}`)
                  user.save((err, user) => {
                    leavereq.remove((err, deleted) => {
                      res.send(err? {err:err} : deleted)
                    })
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = {
  getKomsels,
  getKomsel,
  addKomsel,
  deleteKomsel,
  editKomsel,
  approveKomsel,
  editLeader,
  editPopularity,
  editPoin,
  addPlayHistory,
  addAchievement,
  addMember,
  deleteMember
}