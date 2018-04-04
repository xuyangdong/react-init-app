import React from 'react'
import styles from './MessagePanel.scss'
import PropTypes from 'prop-types'
import listenerLogo from 'publicRes/img/listener.png'

export default class MessagePanel extends React.Component {
	static propTypes = {
		workInfo:PropTypes.object
	}
	render(){
		const {workInfo} = this.props
		return (
			<div className={styles.container}>
				<div className={styles.title}>{workInfo.storyTitle}</div>
				<div className={styles.author}>{workInfo.username}</div>
				<div className={styles.listener}>
					<img src={listenerLogo} />{workInfo.listenCount}
				</div>
			</div>
		)
	}
}
