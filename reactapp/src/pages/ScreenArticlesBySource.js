import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './../App.css'
import { Card, Icon, Modal } from 'antd'
import Nav from './../Nav'

const { Meta } = Card

function ScreenArticlesBySource() {
	const { source } = useParams()
	const [articles, setArticles] = useState([])

	// Modal stuff
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [modal, setModal] = useState({})

	const showModal = (title, content, url) => {
		setIsModalVisible(true)
		setModal({ title, content, url })
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	// Get actual img urls
	// const getImgUrl = url => {
	// 	const newUrl = url.replace(/(?<=jpg).*$/, '.jpg')
	// 	return newUrl
	// }

	useEffect(() => {
		;(async () => {
			const data = await axios(
				`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=c671236d46f64be8973fffcae816ca7c`
			)
			setArticles(data.data.articles)
		})()
	}, [source])

	console.log(articles)
	return (
		<div>
			<Nav />
			<div className='Banner' />
			<div className='Card'>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					{articles.map(art => (
						<Card
							hoverable
							style={{
								width: 300,
								margin: '15px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
							cover={
								<img
									alt='example'
									src={art.urlToImage}
									style={{ height: '200px' }}
								/>
							}
							actions={[
								<Icon
									type='read'
									key='ellipsis2'
									onClick={() => showModal(art.title, art.content, art.url)}
								/>,
								<Icon type='like' key='ellipsis' />,
							]}
							key={art.publishedAt}
						>
							<Meta
								title={art.title}
								style={{ cursor: 'pointer' }}
								description={art.description}
								onClick={() => showModal(art.title, art.content, art.url)}
							/>
							<Modal
								title={modal.title}
								visible={isModalVisible}
								onOk={handleOk}
								maskStyle={{ opacity: 0.3 }}
								onCancel={handleCancel}
							>
								<p>{modal.content}</p>
								<p>
									<a href={modal.url} target='_blank' rel='noopener noreferrer'>
										Read full article
									</a>
								</p>
							</Modal>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default ScreenArticlesBySource
