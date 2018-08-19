import React, { Component } from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import { Consumer } from '../../HOC/withProfile';
import Styles from './styles.m.css';

export default class Post extends Component {
	static propTypes = {
		avatar: 				string.isRequired
	};

	render () {

		const { avatar } = this.props;

		return (

			<Consumer>
				{
					( context ) => (
						<section className = { Styles.post } >
							<span className = { Styles.cross } />
							<img src = { this.props.avatar } />
							{/* 
								<a> { currentUserFirstName } { currentUserLastName }</a>
							*/}
							<a> { `${context.currentUserFirstName } ${context.currentUserLastName }` }</a>
							<time> { moment().locale('uk').format('MMMM D h:mm:ss a') } </time>
							<p>Hello</p>
						</section>
					)
				}
			</Consumer>

		);
	}
}