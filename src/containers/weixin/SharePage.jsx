import React from 'react'
import styles from './SharePage.scss'
import config from '../../config'
import plyr from 'plyr'
// import musicSrc from './陈一发儿-童话镇.mp3'
import PlayerComponent from './PlayerComponent'
import {Button} from 'antd'
export default class SharePage extends React.Component {
	constructor(){
		super()
		this.state = {
			currentTime:0,
			duration:0,
			workInfo:{}
		}
	}
	played = false
	componentDidMount(){
		const audio = document.getElementById('audio1')
		this.player = plyr.setup(this.refs.audio)[0];
		fetch(config.api.works.query(this.props.params.id||120)).then(res => res.json()).then(res => {
			console.log(res.obj.url)
			this.setState({
				workInfo:res.obj
			})
			this.player.source({
				type:'audio',
				title:'Example title',
				sources:[{
					src:res.obj.url||''
				}]
			})
		})
	}
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					打开该链接的APP导航栏
				</div>
				<div className={styles.body}>
					<div className={styles.info}>
						<div className={styles.title}>{this.state.workInfo.storyTitle}</div>
						<div className={styles.author}>{this.state.workInfo.username}</div>
					</div>
					<PlayerComponent onClick={()=>{
						if(!this.played){
							this.player.play()
							this.intervalId = setInterval(() => {
								this.setState({
									currentTime:this.player.getCurrentTime(),
									duration:this.player.getDuration()
								})
							},1000)
							this.played = true
						}else{
							this.player.pause()
							clearInterval(this.intervalId)
							this.played = false
						}

					}} currentTime={this.state.currentTime} duration={this.state.duration}/>
					<div className={styles.operate}>
						<Button type='ghost'>打开</Button>
						<Button type='primary'>下载</Button>
					</div>
				</div>
				<div className={styles.footer}>
				</div>
				<audio ref='audio' id='audio1' controls></audio>
			</div>
		)
	}
}
