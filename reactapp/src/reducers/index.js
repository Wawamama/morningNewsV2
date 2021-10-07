// Import all reducers here
import articlesReducer from './articles'
import tokenReducer from './token'
import langReducer from './language'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	articlesReducer,
	tokenReducer,
	langReducer,
})

export default rootReducer
