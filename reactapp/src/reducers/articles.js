const articlesReducer = (state = [], action) => {
	if (action.type === 'ADD_ARTICLE') {
		const alreadyLiked = state.some(art => art.title === action.payload.title)
		if (!alreadyLiked) return [...state, action.payload]
		return state
	} else if (action.type === 'REMOVE_ARTICLE') {
		const filteredArt = state.filter(art => art.title !== action.payload.title)
		return filteredArt
	} else if (action.type === 'LOAD_ARTICLES') {
		const articles = action.articles
		return articles
	} else {
		return state
	}
}

export default articlesReducer
