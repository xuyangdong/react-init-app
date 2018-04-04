import React from 'react'
import styles from './MobileComponent.scss'
import WorkItemComponent from './WorkItemComponent'
import {fromJS} from 'immutable'

export default class MobileComponent extends React.Component {
	render(){
    console.log('MobileComponent')
		const workList = this.props.activityInfo.getIn(['worksList'],fromJS([]))

		return (
			<div className={styles.container}>
				<div className={styles.content}>
				{workList.map((work,index) => {
					return (
						<WorkItemComponent isPlaying={this.props.playingMusic == work.get('url')} onChooseMusic={this.props.onChooseMusic} playingMusic={this.props.playingMusic} workInfo={work} key={index}/>
					)
				})}
				</div>
			</div>
		)
	}
}
