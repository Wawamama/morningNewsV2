const User = require('./../models/userModel')

exports.getArticles = async (req, res, next) => {
	try {
		console.log(req.params)
		const user = await User.findOne({ token: req.params.token })
		console.log(user)
		res.json({
			status: 'success',
			user,
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
			urlToImage: req.body.article.urlToImage,
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
