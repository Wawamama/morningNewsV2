const tokenReducer = (state = '', action) => {
	if (action.type === 'ADD_TOKEN') {
		const newState = action.token
		return newState
	} else if (action.type === 'DELETE_TOKEN') {
		const newState = ''
		return newState
	} else {
		return state
	}
}

export default tokenReducer
