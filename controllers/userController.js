const uid2 = require('uid2')
const User = require('./../models/userModel')

exports.signUp = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			token: uid2(32),
			tokenGeneratedAt: Date.now(),
		})
		res
			.status(201) // 201 stands for 'created'
			.json({
				status: 'success',
				data: {
					data: newUser,
				},
			})
	} catch (err) {
		let errorMsg = ''
		if (err.code === 11000) errorMsg = 'This email already exists'
		if (err.name === 'ValidationError') {
			errorMsg = Object.values(err.errors)
				.map(val => val.message)
				.join(' & ')
		}
		res.json({
			status: 'fail',
			message: errorMsg,
		})
	}
}

exports.signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// Check if user entered an email and password
		if (!email || !password) {
			throw new Error('Please enter email and password')
		}

		// Check if email matches the password
		const user = await User.findOne({ email: email }).select('+password')
		if (!user || !(await user.correctPassword(password, user.password))) {
			throw new Error('Incorrect email or password')
		}

		// Check if last token is not too old and change it if needed
		// const ExpDate = new Date(user.tokenGeneratedAt.getTime() + 2 * 60000) // 2 minutes
		const ExpDate = new Date(user.tokenGeneratedAt.getDate() + 3) // 3 days

		if (ExpDate < new Date()) {
			const userUpdated = await User.findOneAndUpdate(
				{ email: email },
				{ token: uid2(32), tokenGeneratedAt: Date.now() },
				{ new: true }
			)
			res.status(200).json({
				status: 'success',
				data: {
					data: userUpdated,
				},
			})
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: user,
			},
		})
	} catch (err) {
		res.json({
			status: 'fail',
			message: err.message,
		})
	}
}
