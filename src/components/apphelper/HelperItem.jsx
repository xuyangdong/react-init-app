import React from 'react'
import styles from './HelperItem.scss'
import classnames from 'classnames'
import biscuits from 'publicRes/img/helper/getBiscuits.png'
import {Motion, spring} from 'react-motion'
import arrowIcon from 'publicRes/img/helper/arrow_right.png'
import ReactDom from 'react-dom'

const colors = ['#dfe4cc','#e9cfc8','#c3cadb','#ebe4ba']

export default class HelperItem extends React.Component {
	state = {
		display:false
	}
	render(){
		const isRecordItem = this.props.data.label == '如何录制小故事'
		const isContactUs = this.props.data.label == '如何联系我们？'
		return (
			<div className={classnames(this.props.className,styles.container)}>
				<div className={styles.title} onClick={!isRecordItem?() => {
					this.setState({
						display:!this.state.display
					})
					if(isContactUs){
						this.props.toBottom()
						// let parentNode = ReactDom.findDOMNode(this.props.father).scrollTop = 1000

					}
				}:() => {
					this.refs.video.click()
				}}>
					<img src={this.props.data.icon}/>
					<span>{this.props.data.label}</span>
					<img src={arrowIcon} style={this.state.display||isRecordItem?{transform:'rotate(0deg)'}:{transform:'rotate(90deg)'}} />
				</div>
				<div className={styles.dropDown} style={{display:this.state.display?'flex':'none'}}>
				{this.props.data.children.map((v,k) => {
					return (
						<div key={k} className={styles.dropDownItem} style={{backgroundColor:colors[k%4]}}>
							{`${k+1}、${v.label}`}
						</div>
					)
				})}
				</div>
				<a ref='video' href='https://v.qq.com/iframe/player.html?vid=d0539im7xmg&tiny=0&auto=0' style={{display:'none'}}></a>
			</div>
		)
	}
}
