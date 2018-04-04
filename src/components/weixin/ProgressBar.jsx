import React from 'react'
import styles from './ProgressBar.scss'
import {Progress} from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
export default class ProgressBar extends React.Component {
	static propTypes = {
		currentTime:PropTypes.number,
		duration:PropTypes.number
	}
	calculateProgress = () => {
		if(this.props.currentTime && this.props.duration!=0){
			return 100*(this.props.currentTime/this.props.duration)
		}else{
			return 0
		}
	}
	render(){
		return (
			<div className={styles.container}>

				<div className={styles.progress}>
					<Progress showInfo={false} percent={this.calculateProgress()} strokeWidth={5} />
				</div>
				<div className={styles.time}>
					<div className={styles.start}>{moment(this.props.currentTime*1000).format('mm:ss')}</div>
					<div className={styles.end}>{moment(this.props.duration*1000).format('mm:ss')}</div>
				</div>
			</div>
		)
	}
}
