import React from 'react'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../actions'

const Banner = props => {
	const dispatch = useDispatch()
	return (
		<div className="Banner">
			<img
				src="/images/fr.png"
				alt="FR"
				onClick={() => dispatch(changeLanguage('fr', 'fr'))}
			/>
			<img
				src="/images/uk.png"
				alt="UK"
				onClick={() => dispatch(changeLanguage('gb', 'en'))}
			/>
			<img
				src="/images/ru.png"
				alt="JP"
				onClick={() => dispatch(changeLanguage('ru', 'ru'))}
			/>
		</div>
	)
}

export default Banner
