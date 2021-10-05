const User = require('./../models/userModel')

exports.signUp = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
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
