import React from 'react'
import styles from './LogoShareContainer.scss'
import ShareHeaderBar from '../../../components/weixin/ShareHeaderBar'
import mask from '../../../public/img/mask.png'
import {Button} from 'antd'
import rightBorder from '../../../public/img/rightBorder.png'
import config from '../../../config'
import {fromJS} from 'immutable'

export default class LogoShareContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			logoInfo:fromJS({}),
			workInfo:{}
		}
	}
	componentDidMount(){
		const userId = this.props.match.params.userId
		const badgeId = this.props.match.params.badgeId
		fetch(config.api.logo.query(userId,badgeId),{
			headers:{
				'authorization':sessionStorage.getItem('auth')
			}
		}).then(res => res.json()).then(res => {
			this.setState({
				logoInfo:fromJS(res.obj)
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
						title:res.obj.userNickName,
						desc:`${res.obj.description}`,
						link:window.location.href,
						imgUrl:res.obj.icon,
						success:function(){
							console.log('成功')
						},
						cancel:function(){
							console.log('取消')
						}
					})

					window.wx.onMenuShareTimeline({
						title:res.obj.userNickName,
						link:window.location.href,
						imgUrl:res.obj.icon,
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
	renderDescription = () => {
		let sentences = this.state.logoInfo.get('description','').split(/[',','，']/)
		return sentences.filter(v => v.length>0).map((v,k)=> {
			return k < sentences.length-1?(<p key={k}>{`${v},`}</p>):(<p key={k}>{`${v}`}</p>)
		})
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
					}} uri={`qiyu:\/\/warm.tell\/usershare?userId=${this.state.logoInfo.get('userId')}`} className={styles.headerBar}/>
					<div className={styles.content}>
						<div className={styles.logoHeader}>
							<div className={styles.avatar}>
								<img onClick={()=>{
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
										this.refs.alink.click()
									}
								}} src={this.state.logoInfo.get('userHeadImgUrl')}/>
								<a ref='alink' target='_blank' style={{display:'none'}} href={`qiyu:\/\/warm.tell\/usershare?userId=${this.state.logoInfo.get('userId')}`}></a>
							</div>
							<div className={styles.name}>
								{this.state.logoInfo.get('userNickName')}
							</div>
						</div>
						<div className={styles.logoIcon}>
							<img src={this.state.logoInfo.get('icon')}/>
						</div>
						<div className={styles.logoDescription}>
							{this.renderDescription()}
							<div className={styles.tail}>
								<img src={rightBorder}/>
							</div>
						</div>
						<div className={styles.footer}>
							<Button onClick={()=>{
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
							}}>去读故事</Button>
							<a ref='blink' target='_blank' style={{display:'none'}} href={`qiyu:\/\/warm.tell\/usershare?userId=0`}></a>
						</div>
					</div>
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
