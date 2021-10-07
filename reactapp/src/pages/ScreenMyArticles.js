import React from 'react'
import './../App.css'
import Nav from './../Nav'
import { useSelector } from 'react-redux'
import ArticleCard from '../components/ArticleCard'
import Banner from '../components/Banner'

// const { Meta } = Card

function ScreenMyArticles() {
	const myArticles = useSelector(state => state.articlesReducer)
	const languages = useSelector(state => state.langReducer)
	const token = useSelector(state => state.tokenReducer)
	let error = ''
	if (!token) {
		error = <p>Vous devez etre loggué pour accéder à vos articles</p>
	} else if (myArticles.length === 0) {
		error = <p>Vous n'avez aucun article à lire</p>
	}

	return (
		<div>
			<Nav />

			<Banner />

			<div className="Card">
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					{' '}
					{error}
					{myArticles &&
						myArticles.map((art, idx) => (
							<ArticleCard art={art} liked={false} />
						))}
				</div>
			</div>
		</div>
	)
}

export default ScreenMyArticles
