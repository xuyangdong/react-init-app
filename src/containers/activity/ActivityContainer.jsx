import React from 'react'
import MediaQuery from 'react-responsive'
import MobileComponent from '../../components/activity/MobileComponent'
import WebComponent from '../../components/activity/WebComponent'
import styles from './ActivityContainer.scss'
import background from 'publicRes/img/activity/background.png'
import WhaleTextComponent from '../../components/activity/WhaleTextComponent'
import config from '../../config'
import {fromJS} from 'immutable'
import plyr from 'plyr'
import ShareHeaderBar from '../../components/weixin/ShareHeaderBar'
import mask from '../../public/img/mask.png'

export default class ActivityContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			activityInfo:fromJS({}),
			playingMusic:''
		}
	}
	componentDidMount() {
		this.player = plyr.setup(this.refs.audio)[0];
		fetch(config.api.workTag.query(this.props.match.params.tagId)).then(res => res.json()).then(res => {
			this.setState({
				activityInfo:fromJS(res.obj)
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
						title:'绮语文化|读个小故事',
						desc:`绮语文化|读个小故事`,
						link:window.location.href,
						imgUrl:'http://www.warmtale.com/source/library/icon/HvvZ4DyvBCaRazAi.png',
						success:function(){
							console.log('成功')
						},
						cancel:function(){
							console.log('取消')
						}
					})

					window.wx.onMenuShareTimeline({
						title:'绮语文化|读个小故事',
						link:window.location.href,
						imgUrl:'http://www.warmtale.com/source/library/icon/HvvZ4DyvBCaRazAi.png',
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
	handleChooseMusic = (nextMusic) => {
		if(nextMusic == this.state.playingMusic){
			this.player.togglePlay()
		}else{
			this.player.source({
				type:'audio',
				sources:[{
					src:nextMusic
				}]
			})
			this.player.play()
			this.setState({
				playingMusic:nextMusic
			})
		}

	}
	render() {
		return (
      <div className={styles.wrapper}>
			<div className={styles.container}>
        <ShareHeaderBar onCheckBrowser={(isWeixin) => {
          this.setState({
            isWeixin,
          })
        }} type='download' uri='http://sj.qq.com/myapp/detail.htm?apkName=andoop.android.amstory' className={styles.headerBar}/>
				<div className={styles.header}>
					<WhaleTextComponent className={styles.whale}/>
				</div>
				<MediaQuery minDeviceWidth={1001}>
					<WebComponent onChooseMusic={this.handleChooseMusic} playingMusic={this.state.playingMusic} activityInfo={this.state.activityInfo}/>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={999}>
					<MobileComponent onChooseMusic={this.handleChooseMusic} playingMusic={this.state.playingMusic} activityInfo={this.state.activityInfo}/>
				</MediaQuery>
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
