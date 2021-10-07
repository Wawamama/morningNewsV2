const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Username required'],
		trim: true,
		maxlength: [20, 'User name must not exceed 20 characters.'],
		minlength: [4, 'Username must have 4 characters minimum.'],
	},
	email: {
		type: String,
		required: [true, 'Email required'],
		unique: true,
		trim: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Password required'],
		minlength: [8, 'Password must have 8 characters minimum.'],
		select: false,
	},
	token: {
		type: String,
	},
	tokenGeneratedAt: Date,
})

// Password encryption :
userSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 10)
	next()
})

// Instance Method to CHECK PASSWORD
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword)
}

// Create Model
const User = mongoose.model('User', userSchema)

module.exports = User
