export const addArticle = art => {
	return {
		type: 'ADD_ARTICLE',
		payload: art,
	}
}

export const removeArticle = art => {
	return {
		type: 'REMOVE_ARTICLE',
		payload: art,
	}
}

export const loadArticles = articles => {
	return {
		type: 'LOAD_ARTICLES',
		articles,
	}
}

export const addToken = token => {
	return {
		type: 'ADD_TOKEN',
		token,
	}
}

export const deleteToken = () => {
	return {
		type: 'DELETE_TOKEN',
	}
}

export const changeLanguage = (country, lang) => {
	return {
		type: 'CHANGE_LANG',
		country: country,
		language: lang,
	}
}
