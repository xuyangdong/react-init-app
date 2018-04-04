import React from 'react'
import styles from './PlanShare.scss'
import ShareHeaderBar from '../../../components/weixin/ShareHeaderBar'
import mask from '../../../public/img/mask.png'
import {Button} from 'antd'
import config from '../../../config'
import {fromJS} from 'immutable'
import ProgressBar from '../../../components/weixin/ProgressBar'
import plyr from 'plyr'
import play from 'publicRes/img/planPlay.png'
import stop from 'publicRes/img/planStop.png'
import planLogo from 'publicRes/img/planLogo.png'

export default class PlanShare extends React.Component {
	constructor(){
		super()
		this.state ={
			currentTime:0,
			duration:10,
			planInfo:fromJS({}),
			isWeixin:false,
			played:false
		}
	}
	played = false
	componentDidMount(){
		const audio = document.getElementById('audio1')
		this.player = plyr.setup(this.refs.audio)[0];
		fetch(config.api.plan.query(this.props.match.params.workId,this.props.match.params.userId)).then(res => res.json()).then(res => {
			this.setState({
				planInfo:fromJS(res.obj)
			})
			this.player.source({
				type:'audio',
				title:'Example title',
				sources:[{
					src:res.obj.works.url||''
				}]
			})
		})
	}
	handlePlayer = () => {
		if(this.state.duration>0&&this.state.currentTime==this.state.duration){
			this.player.restart()
			this.played = true
			this.setState({
				played:true
			})
		}else{
			if(!this.played){
				this.player.play()
				this.intervalId = setInterval(() => {
					this.setState({
						currentTime:this.player.getCurrentTime(),
						duration:this.player.getDuration()
					})
				},1000)
				this.played = true
				this.setState({
					played:true
				})
			}else{
				this.player.pause()
				clearInterval(this.intervalId)
				this.played = false
				this.setState({
					played:false
				})
			}
		}
	}
	render(){
		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img className={styles.backgroundImage} src={this.state.planInfo.getIn(['works','coverUrl'])}/>
					<ShareHeaderBar onCheckBrowser={(isWeixin) => {
						this.setState({
							isWeixin,
						})
					}} uri={`qiyu:\/\/warm.tell\/workshare?workId=`} className={styles.headerBar}/>
					<div className={styles.userInfo}>
						<img src={this.state.planInfo.getIn(['works','headImgUrl'])}/>
						<span>
						{`${this.state.planInfo.getIn(['works','username'])}
						,您已坚持打卡读故事第${this.state.planInfo.get('day')}天`}
						</span>
					</div>
					<div className={styles.logo}>
						<div className={styles.logowrapper}>
							<img src={planLogo}/>
							<div className={styles.days}>
								第<span>{this.state.planInfo.get('day')}</span>天
							</div>
						</div>
					</div>
					<div className={styles.description}>
						<p>坚持每天读故事，陪伴宝贝点滴成长。</p>
						<p>今天，你给宝贝读故事了吗？</p>
					</div>
					<div className={styles.button}>
						<Button onClick={() => {
							function isWeixin() {
								var ua = window.navigator.userAgent.toLowerCase();
								if(ua.match(/MicroMessenger/i) == 'micromessenger'){
									return true;
								}else{
									return false;
								}
							}
							if(isWeixin()){
								this.setState({
									isWeixin:true
								})
							}else{
								this.refs.blink.click()
							}
						}}>现在去读</Button>
						<a ref='blink' href='' style={{display:'none'}}></a>
					</div>
					<div className={styles.player}>
					<img src={!this.state.played?play:stop} onClick={this.handlePlayer}/>
					<div className={styles.progressBar}>
						<ProgressBar currentTime={this.state.currentTime} duration={this.state.duration}/>
					</div>
					</div>
					<audio ref='audio' controls></audio>
				</div>
				<div style={{display:this.state.isWeixin?'block':'none'}} className={styles.mask}>
					<img src={mask} onClick={() => {
						this.setState({
							isWeixin:false
						})
					}}/>
				</div>
			</div>
		)
	}
}
