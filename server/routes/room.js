'use strict'
const express = require('express')
let router = express.Router()
const roomCtrl = require('../controllers/roomCtrl')
router.get('/', roomCtrl.getRooms) //v
router.get('/:id', roomCtrl.getRoom) //v
router.post('/', roomCtrl.addRoom) //v
router.delete('/:id', roomCtrl.deleteRoom) //v
router.put('/:id', roomCtrl.editRoom) //ga bakal dicoba
//localhost:3000/room/search/online
//localhost:3000/room/search/offline
router.get('/search/:type', roomCtrl.searchRoom) //v online, offline ()
// router.get('/open', roomCtrl.getOpenRoom) // gajadi
router.put('/winner/:id', roomCtrl.editStatusPlayer) //v edit pemenang
router.post('/participant/:id', roomCtrl.addPlayer) //v => maxmin belum di perketat pas join


module.exports = router