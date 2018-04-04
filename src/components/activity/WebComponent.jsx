import React from 'react'
import styles from './WebComponent.scss'
import WorkItemComponent from './WorkItemComponent'
import {fromJS} from 'immutable'
import classnames from 'classnames'

export default class MobileComponent extends React.Component {
	render(){
		const workList = this.props.activityInfo.getIn(['worksList'],fromJS([]))
    console.log('WebComponent his.props.playingMusic', this.props.playingMusic)
		return (
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={classnames(styles.firstCol,styles.col)}>
						{workList.filter((work,index) => index%2 == 0).map((work,index) => {
							return (
								<WorkItemComponent isPlaying={this.props.playingMusic == work.get('url')} onChooseMusic={this.props.onChooseMusic} playingMusic={this.props.playingMusic} workInfo={work} key={index}/>
							)
						})}
					</div>
					<div className={classnames(styles.second,styles.col)}>
						{workList.filter((work,index) => index%2 != 0).map((work,index) => {
							return (
								<WorkItemComponent isPlaying={this.props.playingMusic == work.get('url')} onChooseMusic={this.props.onChooseMusic} playingMusic={this.props.playingMusic} workInfo={work} key={index}/>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}
