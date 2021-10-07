const langReducer = (state = { lang: 'fr', country: 'fr' }, action) => {
	if (action.type === 'CHANGE_LANG') {
		const newLang = action.language
		const newCountry = action.country
		return { lang: newLang, country: newCountry }
	} else {
		return state
	}
}

export default langReducer
