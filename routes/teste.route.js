const express = require('express')
const router = express.Router()

const testeController = require('../controllers/test.controller')

router.get('/', testeController.test)
router.get('/tabela', testeController.getItens)
router.post('/item', testeController.getItem)

module.exports = router
