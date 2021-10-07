const likeReducer = (state = 0, action) => {
	if (action.type === 'LIKE') {
		return state + 1
	} else if (action.type === 'DISLIKE') {
		return state - 1
	} else {
		return state
	}
}

export default likeReducer
