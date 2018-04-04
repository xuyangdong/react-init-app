import React from 'react'
import styles from './AppHelperContainer.scss'
import arrowIcon from 'publicRes/img/helper/arrow_right.png'
import HelperItem from '../../components/apphelper/HelperItem'
import helperData from 'helperData'
export default class AppHelperContainer extends React.Component {
	handleGoBottom = () => {
		let itemContainer = this.refs.itemContainer
		setTimeout(function(){
			itemContainer.scrollTop = itemContainer.scrollHeight - window.innerHeight
		},10)
	}
	render(){
		return (
			<div className={styles.container}>
				<div className={styles.title} style={{display:'none'}}>
					<img src={arrowIcon} />
					<span>帮助中心</span>
				</div>
				<div className={styles.content} ref='itemContainer'>
				{helperData.map((v,k) => {
					return (
						<HelperItem toBottom={this.handleGoBottom} father={this} data={v} key={k}/>
					)
				})}
				</div>
			</div>
		)
	}
}
