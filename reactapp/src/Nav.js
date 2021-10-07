import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import { Menu, Icon } from 'antd'
import { deleteToken } from './actions'

function Nav() {
	const dispatch = useDispatch()
	const myArticles = useSelector(state => state.articlesReducer)
	const token = useSelector(state => state.tokenReducer)
	return (
		<nav>
			<Menu style={{ textAlign: 'center' }} mode="horizontal" theme="dark">
				<Menu.Item key="mail">
					<Link to="/sources">
						<Icon type="home" />
						Sources
					</Link>
				</Menu.Item>

				<Menu.Item key="test">
					<Link to="/my-articles">
						<Icon type="read" />
						My Articles ({myArticles && myArticles.length})
					</Link>
				</Menu.Item>

				<Menu.Item key="app">
					{token ? (
						<Link to="/" onClick={() => dispatch(deleteToken())}>
							<Icon type="logout" />
							Logout
						</Link>
					) : (
						<Link to="/" onClick={() => dispatch(deleteToken())}>
							<Icon type="login" />
							Login
						</Link>
					)}
				</Menu.Item>
			</Menu>
		</nav>
	)
}

export default Nav
