'use strict'
const express = require('express')
let router = express.Router()
const requestCtrl = require('../controllers/requestCtrl')

//cuma bikin aja bukan approve ato apa ya
//kalo approve di komsel
router.get('/komsel/join', requestCtrl.getJoinKomsel) //v
router.get('/komsel/leave', requestCtrl.getExitKomsel) //v
router.get('/komsel/create', requestCtrl.getCreateKomsel) //v
router.post('/komsel/join/:idKomsel', requestCtrl.addJoinKomsel) //v
router.post('/komsel/leave/:idKomsel', requestCtrl.addExitKomsel) //v

module.exports = router