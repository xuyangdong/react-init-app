import React from 'react'
import whale from 'publicRes/img/activity/whale.png'
import styles from './WhaleTextComponent.scss'
import classnames from 'classnames'

export default class WhaleTextComponent extends React.Component {
	render(){
		console.log(window.innerWidth)
		return (
			<div className={classnames(styles.container,this.props.className)}>
				<img src={whale} style={{width:(window.innerWidth/2)}} className={styles.whale}/>
			</div>
		)
	}
}
