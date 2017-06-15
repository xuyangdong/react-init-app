import React from 'react'
import styles from './BaseContainer.scss'
// import {Button} from 'antd'
const BaseContainer = React.createClass({
	render() {
		return (
			<div className={styles.container}>
			<div className={styles.navigation}>
			navigation
			</div>
			<div className={styles.content}>
				{this.props.children}
			</div>
			</div>
		)
	}
})

export default BaseContainer
