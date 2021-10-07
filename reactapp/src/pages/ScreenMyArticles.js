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
					{myArticles.length === 0 ? <p>Vous n'aimez aucun article</p> : ''}
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
