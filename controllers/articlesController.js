const User = require('./../models/userModel')

exports.getArticles = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		res.json({
			status: 'success',
			articles: user.favArticles,
		})
	} catch (err) {
		res.json({
			status: 'fail',
		})
	}
}

exports.addArticle = async (req, res, next) => {
	try {
		const addedArticle = {
			title: req.body.article.title,
			url: req.body.article.url,
			description: req.body.article.description,
			urlImg: req.body.article.urlToImage,
			content: req.body.article.content,
			language: req.body.language,
		}
		console.log(addedArticle)
		const user = await User.findOneAndUpdate(
			{ token: req.body.token },
			{ $push: { favArticles: addedArticle } },
			{ new: true }
		)

		res.json({
			status: 'success',
			article: {
				title: req.body.title,
				url: req.body.url,
			},
			user,
		})
	} catch (err) {
		res.json({
			status: 'fail',
		})
	}
}
