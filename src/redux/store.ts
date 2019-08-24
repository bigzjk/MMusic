import { createStore, compose, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...[thunk]),
        // ts-lint 
        composeWithDevTools()
    )
)

export default store