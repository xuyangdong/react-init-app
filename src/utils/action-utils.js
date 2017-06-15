export function actionNames(action) {
	const uppercase = action.toUpperCase()
	return [`${uppercase}_REQUEST`, `${uppercase}_SUCCESS`, `${uppercase}_FAILURE`]
}
