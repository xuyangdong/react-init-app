import React from 'react'
import styles from './StoryShare.scss'
import config from '../../../config'
import ShareHeaderBar from '../../../components/weixin/ShareHeaderBar'
import ProgressBar from '../../../components/weixin/ProgressBar'
import mask from '../../../public/img/mask.png'
import {fromJS} from 'immutable'
import {Button} from 'antd'

export default class StoryShare extends React.Component {
	constructor(){
		super()
		this.state = {
			workInfo:{},
			isWeiXin:false,
			storyInfo:fromJS({})
		}
	}
	componentDidMount(){
		fetch(config.api.story.query(this.props.match.params.storyId)).then(res => res.json()).then(res => {
			this.setState({
				storyInfo:fromJS(res.obj)
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
						title:res.obj.title,
						desc:`${res.obj.author}`,
						link:window.location.href,
						imgUrl:res.obj.coverUrl,
						success:function(){
							console.log('成功')
						},
						cancel:function(){
							console.log('取消')
						}
					})

					window.wx.onMenuShareTimeline({
						title:res.obj.title,
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
	getStoryList = () => {
		let storyList = []
		try {
			storyList = fromJS(JSON.parse(this.state.storyInfo.get('content','[]')))
		}catch(e){}
		return storyList
	}
	render(){
		const storyList = this.getStoryList()
		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img className={styles.backgroundImage} />
					<div className={styles.headerBar}>
						<ShareHeaderBar onCheckBrowser={(isWeixin) => {
							this.setState({
								isWeixin,
							})
						}} uri={`qiyu:\/\/warm.tell\/workshare?workId=`}/>
					</div>
					<div className={styles.content}>
						<div className={styles.title}>
							<span>{this.state.storyInfo.get('title')}</span>
							<span>{this.state.storyInfo.get('author')}</span>
						</div>
						<div className={styles.artical}>
						{storyList.map((v,k) => {
							if(!v.get('coverUrl')){
								return (<p key={k}>{v.get('content')}</p>)
							}else{
								return (<div key={k}><p>{v.get('content')}</p><img style={{width:'calc(100vw - 40px)'}} src={v.get('coverUrl')}/></div>)
							}
						})}
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.logo}>
							<p>快去【读个小故事】</p>
							<p>把这个故事制作成精美有声童话吧~</p>
						</div>
						<div className={styles.button}>
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
							}}>现在就去</Button>
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
