import React from 'react'
import {Progress} from 'antd'
import styles from './PlayerComponent.scss'
import playerButton from './method-draw-image.png'
import moment from 'moment'
export default class PlayerComponent extends React.Component {
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
				<div className={styles.playerWrapper}>
					<div className={styles.progressBarWrapper}>
						<Progress width={250} type="dashboard" percent={this.calculateProgress()} />
					</div>
					<div className={styles.playerButtonWrapper}>
						<img onClick={this.props.onClick} src={playerButton} style={{width:200}} />
					</div>
					<div className={styles.startTimeStamp}>
						{moment(this.props.currentTime*1000).format('mm:ss')}
					</div>
					<div className={styles.endTimeStamp}>
						{moment(this.props.duration*1000).format('mm:ss')}
					</div>
				</div>
			</div>
		)
	}
}
