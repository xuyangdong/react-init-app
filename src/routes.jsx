import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import BaseContainer from './containers/BaseContainer'
import App from './App'
const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={BaseContainer}>
			<Route path="app" component={App}/>
		</Route>
	</Router>
)

export default routes
