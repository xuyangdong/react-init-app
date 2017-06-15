import thunkMiddleware from 'redux-thunk'
import {callAPIMiddleware} from 'middlewares'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware, compose,} from 'redux'
import config from './config'

export const createMyStore = function(rootReducer) {
	const middlewares = []
	middlewares.push(thunkMiddleware)
	middlewares.push(callAPIMiddleware)

	// middlewares for development
	if (config.debug) {
		// middleware that logs the global state for debug
		const loggerMiddleware = createLogger({
			stateTransformer: (state) => {
				return state.toJS()
			},
		})
		middlewares.push(loggerMiddleware)
	}

	const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(createStore)
	const store = createStoreWithMiddleware(rootReducer)

	return store
}
