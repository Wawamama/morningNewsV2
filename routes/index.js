const express = require('express')
const { signUp, signIn } = require('./../controllers/userController')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' })
})

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

module.exports = router
