import React, { useState } from 'react'
import { Card, Icon, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addArticle, removeArticle } from './../actions'
import axios from 'axios'

const { Meta } = Card

const ArticleCard = ({ art, liked }) => {
	const token = useSelector(state => state.tokenReducer)
	const language = useSelector(state => state.langReducer)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [modal, setModal] = useState({})

	const dispatch = useDispatch()

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

	const handleAddArticle = async article => {
		dispatch(addArticle(art))
		const data = await axios.post('/my-articles', {
			article,
			token,
			language: language.lang,
		})
	}

	let rightBtn = ''
	if (liked) {
		rightBtn = (
			<Icon
				type="like"
				key="ellipsis"
				onClick={() => {
					handleAddArticle(art)
				}}
			/>
		)
	} else {
		rightBtn = (
			<Icon
				type="delete"
				key="ellipsis"
				onClick={() => {
					dispatch(removeArticle(art))
				}}
			/>
		)
	}

	return (
		<Card
			key={art.publishedAt}
			hoverable
			style={{
				width: 300,
				margin: '15px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
			cover={
				<img alt="example" src={art.urlToImage} style={{ height: '200px' }} />
			}
			actions={[
				<Icon
					type="read"
					key="ellipsis2"
					onClick={() => showModal(art.title, art.content, art.url)}
				/>,
				rightBtn,
			]}
			key={art.title}
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
				maskStyle={{ opacity: 0.5 }}
				onCancel={handleCancel}
			>
				<p>{modal.content}</p>
				<p>
					<a href={modal.url} target="_blank" rel="noopener noreferrer">
						Read full article
					</a>
				</p>
			</Modal>
		</Card>
	)
}

export default ArticleCard
