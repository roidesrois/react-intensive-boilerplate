import React, { Component } from 'react';
import { withProfile } from '../../HOC/withProfile';
import { socket } from '../../socket';
import Styles from './styles.m.css';
import cx from 'classnames';

@withProfile
export default class StatusBar extends Component {
	state = {
		online: false,
	}

	componentDidMount () {
		// console.log('%c componentDidMount', 'background: #222; color: #bada55');
		socket.on('connect', () => {
			this.setState({
				online: true,
			});
		});

		socket.on('disconnect', () => {
			this.setState({
				online: false,
			});
		});
	}


	componentWillUnMount () {
		//do it izza utechki pamyati
		socket.removeListener('connect');
		socket.removeListener('disconnect');
	}

	// componentWillMount () {
	// 	console.log('%c componentWillMount', 'background: #222; color: #bada55');
	// }

	render () {
		// console.log('%c render', 'background: #222; color: #bada55');
		const { avatar, currentUserFirstName, currentUserLastName } = this.props;
		const { online } = this.state;

		const statusStyles = cx(Styles.status, {
			[Styles.online]: online,
			[Styles.offline]: !online,
		});

		const statusMessage = online ? 'Online' : 'Offline';

		return (
			<section className = { Styles.statusBar }>
				<div className = { statusStyles }>
					<div>{ statusMessage }</div>
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

