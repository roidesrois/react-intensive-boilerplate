import React, { Component } from 'react';
import { string } from 'prop-types';
import { Consumer } from '../../HOC/withProfile';

import Styles from './styles.m.css';

export default class Composer extends Component {

	static propTypes = {
		avatar: string.isRequired,
	};

	state = {
		comment: '',
	}

	_handleTextAreaChange = (event) => {
		const { value } = event.target;

		this.setState({
			comment: value,
		});
	}

	_handleTextareaKeyPress = (event) => {
		const enterKey = event.key === 'Enter';

		if(enterKey) {
			event.preventDefault();
			this._createPost();
		}
	}

	_handleTextAreaCopy = (event) => {
		event.preventDefault();
	}

	_createPost() {
		const { _createPost } = this.props;
		const { comment } = this.state;


		if (!comment.trim()) {
			return null;
		};

		_createPost(comment);
		this.setState({
			comment: '',
		});

		// if ( comment ) {
		// 	_createPost(comment);

		// 	this.setState({
		// 		comment: '',
		// 	});
		// }
	}

	_handleFormSubmit = (event) => {
		event.preventDefault();
		this._createPost();
	}

	render () {
		const { avatar } = this.props;
		const { comment } = this.state;

		console.log( comment );

		return (
			//Figurnie skobki posle <Consumer> nujno opuskat' na stroku nije
			<Consumer>
				{
					( context ) => (
							<section className = { Styles.composer }>
								<img src = { avatar } />
								<form
									onSubmit = { this._handleFormSubmit } 
								>
									<textarea 
										placeholder = { `What's on your mind, ${context.currentUserFirstName}` }
										value = { comment }
										onChange = { this._handleTextAreaChange }
										onCopy = { this._handleTextAreaCopy }
										onKeyPress = { this._handleTextareaKeyPress }
								 	/>
									<input type = 'submit' value = 'Post' />
								</form>
							</section>
					)
				}
			</Consumer>
		);
	}
}