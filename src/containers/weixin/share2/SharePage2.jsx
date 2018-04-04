import React from 'react'
import styles from './SharePage2.scss'
import config from '../../../config'
import ShareHeaderBar from '../../../components/weixin/ShareHeaderBar'
import PlayerButton from '../../../components/weixin/PlayerButton'
import MessagePanel from '../../../components/weixin/MessagePanel'
import ProgressBar from '../../../components/weixin/ProgressBar'
import plyr from 'plyr'
import mask from '../../../public/img/mask.png'
// import wx from 'jweixin-1.0.0.js'
// import musicSrc from '../陈一发儿-童话镇.mp3'

export default class SharePage2 extends React.Component {
	constructor(){
		super()
		this.state = {
			workInfo:{},
			currentTime:0,
			duration:0,
			isWeiXin:false,
			played:false
		}
	}
	played = false
	componentDidMount(){
		const audio = document.getElementById('audio1')
		this.player = plyr.setup(this.refs.audio)[0];
		if(typeof this.props.match.params.id != 'undefined'){
			fetch(config.api.works.query(this.props.match.params.id||239)).then(res => res.json()).then(res => {
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
				let url = encodeURIComponent(window.location.href.split('#')[0])
				fetch(`http://120.79.0.217/mp/getJsSdkSignature?url=${url}`).then(res2 => res2.json()).then(res2 => {
					window.wx.config({
						debug:false,
						appId:'wxdd57892cf267701b',
						timestamp:res2.obj.timestamp,
						nonceStr:res2.obj.nonceStr,
						signature:res2.obj.signature,
						jsApiList:['onMenuShareAppMessage','onMenuShareTimeline']
					})
					window.wx.ready(function(){
						window.wx.onMenuShareAppMessage({
							title:res.obj.storyTitle,
							desc:`${res.obj.username}`,
							link:window.location.href,
							imgUrl:res.obj.coverUrl,
							type:'music',
							dataUrl:res.obj.url,
							success:function(){
								console.log('成功')
							},
							cancel:function(){
								console.log('取消')
							}
						})

						window.wx.onMenuShareTimeline({
							title:res.obj.storyTitle,
							link:window.location.href,
							imgUrl:res.obj.coverUrl,
							success:function(){
								console.log('成功')
							},
							cancel:function(){
								console.log('取消')
							}
						});
					})
				})
			})
		}

	}
	handlePlayer = () => {
		if(this.state.duration>0&&this.state.currentTime==this.state.duration){
			this.player.restart()
			// this.played = true
			this.setState({
				played:true
			})
		}else{
			if(!this.state.played){
				this.player.play()
				this.intervalId = setInterval(() => {
					this.setState({
						currentTime:this.player.getCurrentTime(),
						duration:this.player.getDuration()
					})
				},1000)
				// this.played = true
				this.setState({
					played:true
				})
			}else{
				this.player.pause()
				clearInterval(this.intervalId)
				// this.played = false
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
					<img className={styles.backgroundImage} src={this.state.workInfo.coverUrl}/>
					<ShareHeaderBar onCheckBrowser={(isWeixin) => {
						this.setState({
							isWeixin,
						})
					}} uri={`qiyu:\/\/warm.tell\/workshare?workId=${this.state.workInfo.id}`} className={styles.headerBar}/>
					<PlayerButton played={this.state.played} onClick={this.handlePlayer} coverUrl={this.state.workInfo.coverUrl} />
					<MessagePanel workInfo={this.state.workInfo} />
					<ProgressBar currentTime={this.state.currentTime} duration={this.state.duration}/>
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
