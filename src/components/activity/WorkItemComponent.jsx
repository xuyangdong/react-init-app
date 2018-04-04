import React from 'react'
import playerButton from 'publicRes/img/activity/playerButton.png'
import stopButton from 'publicRes/img/activity/stopButton.png'
import styles from './WorkItemComponent.scss'

export default class WorkItemComponent extends React.Component {

  state = {
    isPlaying: false
  }

	handleChooseMusic = () => {
		// this.props.onChooseMusic(workInfo.get('url'))
		const workInfo = this.props.workInfo
		// if(this.props.playingMusic == workInfo.get('url')){
		// 	console.log("同一个音频",this.player.isPaused())
		// 	if(this.player.isPaused()){
		// 		this.player.play()
		// 	}else{
		// 		this.player.pause()
		// 	}
		// 	// this.player.togglePlay()
		// }else{
		// 	console.log("不同音频")
		// 	this.player.pause()
		// 	this.player.source({
		// 		type:'audio',
		// 		sources:[{
		// 			src:workInfo.get('url')
		// 		}]
		// 	})
		// 	// this.player.play()
		// 	this.props.onChooseMusic(workInfo.get('url'))
		// }
		this.props.onChooseMusic(workInfo.get('url'))
    this.setState({
      isPlaying: !this.state.isPlaying
    })
	}
	render(){
		const workInfo = this.props.workInfo
		return (
			<div className={styles.container}>
				<div className={styles.userInfo}>
					<img src={workInfo.get('headImgUrl')} className={styles.userHeader}/>
					<div className={styles.userRightPanel}>
						<span>{workInfo.get('username')}</span>
						<span>{workInfo.get('duration')}</span>
					</div>
				</div>
				<div className={styles.workInfo}>
					<img src={workInfo.get('coverUrl')} className={styles.cover} />
					<div className={styles.rightPanel}>
						<div className={styles.introduction}>
							<span className={styles.storyTitle}>{workInfo.get('storyTitle')}</span>
							<span className={styles.storyIntroduction}>故事简介</span>
						</div>
						<img src={(this.props.isPlaying && this.state.isPlaying)?stopButton:playerButton} className={styles.playerButton} onClick={this.handleChooseMusic}/>
					</div>
				</div>

			</div>
		)
	}
}
