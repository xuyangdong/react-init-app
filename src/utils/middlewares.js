import _ from 'underscore'

export function callAPIMiddleware({
	dispatch,
	getState
}) {
	return next => action => {
		const {
			types,
			callAPI,
			shouldCallAPI = () => true,
			payload = {}
		} = action

		// validate action
		if (!types) {
			// normal action, just pass it on
			return next(action)
		}
		if (!Array.isArray(types) || types.length !== 3 || !_.every(types, type => typeof type === 'string')) {
			throw new Error('Expected an array of three string types. - callAPIMiddleware')
		}
		if (typeof callAPI !== 'function') {
			throw new Error('Expected fetch to be a function - callAPIMiddleware')
		}

		if (!shouldCallAPI(getState())) {
			return
		}

		const [requestType, successType, failureType] = types
		dispatch(_.extend({}, payload, {
			type: requestType,
		}))

		return callAPI().then(response => dispatch(_.extend({}, payload, {
			response,
			type: successType,
		})), error => dispatch(_.extend({}, payload, {
			error,
			type: failureType
		})))
	}
}
