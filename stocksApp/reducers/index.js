import loggedReducer from './isLogged'
import {combineReducers} from 'redux'

const allreducers = combineReducers({
    isLogged: loggedReducer,
})

export default allreducers