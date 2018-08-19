import React, { Component } from 'react';
import { withProfile } from '../../HOC/withProfile';

import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {

	componentDidMount () {
		console.log('%c componentDidMount', 'background: #222; color: #bada55');
	}

	componentWillMount () {
		console.log('%c componentWillMount', 'background: #222; color: #bada55');
	}

	render () {
		console.log('%c render', 'background: #222; color: #bada55');
		const { avatar, currentUserFirstName, currentUserLastName } = this.props;
		return (
			<section className = { Styles.statusBar }>
				<div className = { `${Styles.status} ${Styles.offline}` }>
					<div>Offline</div>
					<span />
				</div>
				<button>
					<img src = { avatar } />
					<span> { currentUserFirstName } </span>
					&nbsp;
					<span> { currentUserLastName } </span>
				</button>
			</section> 
		)
	}
}

