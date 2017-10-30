'use strict'
const express = require('express')
let router = express.Router()
const komselCtrl = require('../controllers/komselCtrl')

router.get('/', komselCtrl.getKomsels) // v
router.get('/:id', komselCtrl.getKomsel) // v
router.post('/', komselCtrl.addKomsel) // v
router.delete('/:id', komselCtrl.deleteKomsel) //v
router.put('/:id', komselCtrl.editKomsel) //v
router.put('/approval/:id', komselCtrl.approveKomsel) //v
// router.put('/leader/:id', komselCtrl.editLeader) // ga jadi
//habis update room => winning
// router.put('/popularity/:id', komselCtrl.editPopularity) //
// router.put('/badge/:id', komselCtrl.editBadge) //
// router.put('/poin/:id', komselCtrl.editPoin) //
// router.post('/play/:id', komselCtrl.addPlayHistory) // di page ain
router.post('/achievement/:id', komselCtrl.addAchievement) //

router.post('/member/:idRequest', komselCtrl.addMember) //v
router.delete('/member/:idRequest', komselCtrl.deleteMember) //v

module.exports = router