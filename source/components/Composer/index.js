import React, { Component } from 'react';
import { string } from 'prop-types';
import { Consumer } from '../../HOC/withProfile';

import Styles from './styles.m.css';

export default class Composer extends Component {

	static propTypes = {
		avatar: string.isRequired,
	};

	render () {
		const { avatar } = this.props;

		return (
			//Figurnie skobki posle <Consumer> nujno opuskat' na stroku nije
			<Consumer>
				{
					( context ) => (
							<section className = { Styles.composer }>
								<img src = { avatar } />
								<form>
									<textarea placeholder = { `What's on your mind, ${context.currentUserFirstName}` } />
									<input type = 'submit' value = 'Post' />
								</form>
							</section>
					)
				}
			</Consumer>
		);
	}
}