const express = require('express')
const { signUp, signIn, logout } = require('./../controllers/userController')
const {
	getArticles,
	addArticle,
	deleteArticle,
} = require('./../controllers/articlesController')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' })
})

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

router.get('/my-articles/:token', getArticles)
router.post('/my-articles', addArticle)
// router.delete('/my-articles', deleteArticle)
router.get('/logout/:token/:lang', logout)

module.exports = router
