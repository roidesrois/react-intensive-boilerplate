import React, { Component } from 'react';
import { string } from 'prop-types';

import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import { Provider } from '../../HOC/withProfile';
import Styles from './styles.m.css';

import avatar from '../../theme/assets/homer.png';

const config = {
	avatar,
	currentUserFirstName: 'Andrey',
	currentUserLastName: 'Prisniak',
};

export default class Feed extends Component {
	static propTypes = {
		avatar: 				string.isRequired,
		currentUserFirstName: 	string.isRequired,
		currentUserLastName: 	string.isRequired,
	};


	render () {
		//this.props
		const { avatar, currentUserFirstName, currentUserLastName } = this.props;

		return (
			<section className = { Styles.feed } >
				<StatusBar />
				<Composer avatar = { avatar } />

				<Post
					avatar = { avatar }
				/>
			</section>
		);
	}
}