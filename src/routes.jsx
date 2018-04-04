import React from 'react'
import {Route, HashRouter, BrowserRouter} from 'react-router-dom'
import BaseContainer from './containers/BaseContainer'
import AsyncComponent from './components/common/AsyncComponent'

/** -------------------- weixin share ------------------- **/
const SharePageAsync = AsyncComponent(() => import('./containers/weixin/SharePage'))
const SharePage2Async = AsyncComponent(() => import('./containers/weixin/share2/SharePage2'))
const LogoShareAsync = AsyncComponent(() => import('./containers/weixin/logoshare/LogoShareContainer'))
const PlanShareAsync = AsyncComponent(() => import('./containers/weixin/plan/PlanShare'))
const StoryShareASync = AsyncComponent(() => import('./containers/weixin/story/StoryShare'))
const AppHelperContainerAsync = AsyncComponent(() => import('./containers/apphelper/AppHelperContainer'))
const ActivityContainerAsync = AsyncComponent(() => import('./containers/activity/ActivityContainer'))
const UserProtocolContainerAsync = AsyncComponent(() => import('./containers/userProtocol/UserProtocolContainer'))
/** -------------------- weixin share ------------------- **/

const Router = process.env.NODE_ENV=='production'?BrowserRouter:HashRouter
const routes = (<Router>
	<div>
		<Route path="/:prefix/:proxy">
			<BaseContainer>
				<div>
					<Route exact path="/:prefix/:proxy/userProtocol" component={UserProtocolContainerAsync}/>
					<Route path="/:prefix/:proxy/help" component={AppHelperContainerAsync}/>
					<Route path="/:prefix/:proxy/activity/:tagId" component={ActivityContainerAsync}/>
					<Route path="/:prefix/:proxy/weixin">
						<div>
							<Route path="/:prefix/:proxy/weixin/share/:id" component={SharePageAsync}/>
							<Route path="/:prefix/:proxy/weixin/share2/:id" component={SharePage2Async}/>
							<Route path="/:prefix/:proxy/weixin/logoShare/:badgeId/user/:userId" component={LogoShareAsync}/>
							<Route path="/:prefix/:proxy/weixin/planShare/:workId/user/:userId" component={PlanShareAsync}/>
							<Route path="/:prefix/:proxy/weixin/storyShare/:storyId" component={StoryShareASync}/>
						</div>
					</Route>
				</div>
			</BaseContainer>
		</Route>

		<Route path="/:proxy" >
			<div>
				<Route path="/:proxy/userProtocol"/>
				<Route path="/:proxy/weixin">
					<div>
						<Route path="/:proxy/share/:id" component={SharePageAsync}/>
						<Route path="/:proxy/share2/:id" component={SharePage2Async}/>
						<Route path="/:proxy/logoShare/:badgeId/user/:userId" component={LogoShareAsync}/>
					</div>
				</Route>
			</div>
		</Route>
		</div>
	</Router>)

export default routes
