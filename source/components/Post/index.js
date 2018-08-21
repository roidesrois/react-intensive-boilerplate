import React, { Component } from 'react';
import { string, func } from 'prop-types';
import moment from 'moment';
import { withProfile } from '../../HOC/withProfile';
import Styles from './styles.m.css';
import Like from '../Like';

@withProfile
export default class Post extends Component {
	static propTypes = {
		avatar: 				string.isRequired,
		comment: 				string.isRequired,
        firstName:  			string.isRequired,
        lastName: 				string.isRequired,
		_removePostAsync: 		func.isRequired
	};

	// this._deletePost
	_deletePost = (e) => {
		const { _removePostAsync, id } = this.props;

		// this.props._deletePost
		_removePostAsync(id);
	}

	shouldcomponentupdate(prevProps) {
		return prevProps.likes.length !== this.props.likes;
		//return false;
	}

    _getCross () {
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        return `${firstName} ${lastName}` ===  `${currentUserFirstName} ${currentUserLastName}` 
                ?  <span
                        className = { Styles.cross }
                        onClick = { this._deletePost }
                    />
                : null;
    }



	render () {

		const { 
			id,
			avatar, 
			comment, 
			firstName, 
			lastName, 
			created,
			likes,
			_likePostAsync,
		} = this.props;

		const cross = this._getCross();

		// if (comment === '3') {
		// 	undefined();
		// }

		return (
				<section className = { Styles.post } >
					{/*<span className = { Styles.cross } onClick = { this._deletePost } />*/}
					{ cross }
					<img src = { avatar } />
					{/* 
						<a> { currentUserFirstName } { currentUserLastName }</a>
					*/}
					<a> { `${firstName } ${lastName }` }</a>
					<time> { moment.unix(created).format('MMMM D h:mm:ss a') } </time>
					<p>{ comment }</p>
					<Like 
						id = { id }
						likes = { likes }
						_likePostAsync = { _likePostAsync } 
					/>
				</section>
		);
	}
}