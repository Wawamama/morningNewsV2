import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './../App.css'
import Nav from './../Nav'
import ArticleCard from '../components/ArticleCard'
import Banner from '../components/Banner'

function ScreenArticlesBySource() {
	const { source } = useParams()
	const [articles, setArticles] = useState([])
	const token = useSelector(state => state.tokenReducer)

	useEffect(() => {
		;(async () => {
			const data = await axios(
				`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=c671236d46f64be8973fffcae816ca7c`
			)
			setArticles(data.data.articles)
		})()
	}, [source])

	if (!token) {
		return <Redirect to="/" />
	} else {
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
						{articles.map((art, idx) => (
							<ArticleCard art={art} liked={true} />
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default ScreenArticlesBySource
