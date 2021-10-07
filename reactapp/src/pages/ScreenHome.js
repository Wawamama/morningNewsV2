import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './../App.css'
import { Input, Button } from 'antd'
import { Redirect } from 'react-router'
import axios from 'axios'
import { addToken } from '../actions'

function ScreenHome() {
	const dispatch = useDispatch()
	const [signUpError, setSignUpError] = useState('')
	const [signInError, setSignInError] = useState('')
	const [isLogin, setIsLogin] = useState(false)
	const [signUpData, setSignUpData] = useState({
		username: '',
		email: '',
		password: '',
	})
	const [signInData, setSignInData] = useState({
		email: '',
		password: '',
	})

	const handleSubmitSignUp = async () => {
		try {
			const req = await axios.post('/sign-up', {
				name: signUpData.username,
				email: signUpData.email,
				password: signUpData.password,
			})
			if (req.data.status === 'success') {
				setIsLogin(true)
				dispatch(addToken(req.data.data.data.token))
			} else {
				setSignUpError(req.data.message)
			}
		} catch (err) {
			setSignUpError(err.response.data)
		}
	}

	const handleSubmitSignIn = async () => {
		try {
			const req = await axios.post('/sign-in', {
				email: signInData.email,
				password: signInData.password,
			})
			if (req.data.status === 'success') {
				setIsLogin(true)
				dispatch(addToken(req.data.data.data.token))
			} else {
				setSignInError(req.data.message)
			}
		} catch (err) {
			setSignInError(err.response.data)
		}
	}

	if (isLogin) {
		return <Redirect to="/sources" />
	} else {
		return (
			<div className="Login-page">
				{/* SIGN-IN */}

				<div className="Sign">
					<Input
						className="Login-input"
						placeholder="arthur@lacapsule.com"
						onChange={e =>
							setSignInData({ ...signInData, email: e.target.value })
						}
					/>

					<Input.Password
						className="Login-input"
						placeholder="password"
						onChange={e =>
							setSignInData({ ...signInData, password: e.target.value })
						}
					/>
					<div style={{ margin: '1rem' }}>{signInError}</div>

					<Button
						style={{ width: '80px' }}
						type="primary"
						onClick={() => handleSubmitSignIn()}
					>
						Sign In
					</Button>
				</div>

				{/* SIGN-UP */}

				<div className="Sign">
					<Input
						className="Login-input"
						placeholder="Username"
						name="username"
						value={signUpData.username}
						onChange={e =>
							setSignUpData({ ...signUpData, username: e.target.value })
						}
					/>
					<Input
						className="Login-input"
						placeholder="Email"
						name="email"
						value={signUpData.email}
						onChange={e =>
							setSignUpData({ ...signUpData, email: e.target.value })
						}
					/>
					<Input.Password
						className="Login-input"
						placeholder="password"
						name="password"
						value={signUpData.password}
						onChange={e =>
							setSignUpData({ ...signUpData, password: e.target.value })
						}
					/>
					<div style={{ margin: '1rem' }}>{signUpError}</div>
					<Button
						style={{ width: '80px' }}
						type="primary"
						onClick={() => handleSubmitSignUp()}
					>
						Sign Up
						{/* <Link to='/sources'>Sign Up</Link> */}
					</Button>
				</div>
			</div>
		)
	}
}

export default ScreenHome
