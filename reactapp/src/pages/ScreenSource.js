import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGlobeAmericas,
	faFootballBall,
	faChartBar,
} from '@fortawesome/free-solid-svg-icons'

import './../App.css'
import { List, Avatar } from 'antd'
import Nav from './../Nav'

function ScreenSource() {
	const [sourceList, setSourceList] = useState([])

	const getIcon = category => {
		if (category === 'sports') return <FontAwesomeIcon icon={faFootballBall} />
		if (category === 'business') return <FontAwesomeIcon icon={faChartBar} />

		return <FontAwesomeIcon icon={faGlobeAmericas} />
	}

	useEffect(() => {
		;(async () => {
			const data = await axios(
				'https://newsapi.org/v2/top-headlines/sources?apiKey=c671236d46f64be8973fffcae816ca7c&country=fr&language=fr'
			)
			setSourceList(data.data.sources)
		})()
	}, [])

	console.log(sourceList)
	return (
		<div>
			<Nav />

			<div className='Banner' />

			<div className='HomeThemes'>
				<List
					itemLayout='horizontal'
					dataSource={sourceList}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar
										icon={getIcon(item.category)}
										style={{ backgroundColor: '#172774' }}
									/>
								}
								title={
									<Link to={`/articlesBySource/${item.id}`}>{item.name}</Link>
								}
								description={item.description}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	)
}

export default ScreenSource
