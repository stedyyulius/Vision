'use strict'
const express = require('express')
let router = express.Router()
const deckCtrl = require('../controllers/deckCtrl')

router.get('/:gameId', deckCtrl.getDeckByGame) //v
router.get('/:gameId/:limit', deckCtrl.getLimitedQByGame) //v
router.post('/question/:gameId', deckCtrl.addQuestion) //v
router.get('/question/:id', deckCtrl.getQuestion) //v
router.delete('/question/:id', deckCtrl.deleteQuestion) //v
router.put('/question/:id', deckCtrl.editQuestion) //v

module.exports = router