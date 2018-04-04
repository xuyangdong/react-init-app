import React from 'react'
import styles from './ShareHeaderBar.scss'
import logo from 'publicRes/img/logo.png'
import {Button} from 'antd'
import PropTypes from 'prop-types'

export default class ShareHeaderBar extends React.Component {
	static propTypes = {
		workId:PropTypes.number
	}
	isWeiXin = () =>{
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	}
	render(){
		return (
			<div className={styles.container} style={{height:55}}>
				<img src={logo}/>
				<Button onClick={() => {
					if(this.isWeiXin()){
						this.props.onCheckBrowser(true)
					}else{
						this.refs.link.click()
					}

				}}>{this.props.type == 'download'?'下载APP':'在APP中打开'}</Button>
				<a ref='link' target='_blank' href={this.props.uri}></a>
			</div>
		)
	}
}
