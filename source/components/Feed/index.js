import React, { Component } from 'react';
import { string } from 'prop-types';

import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import { Provider } from '../../HOC/withProfile';
import Styles from './styles.m.css';
import { getUniqueID } from '../../instruments';
import avatar from '../../theme/assets/homer.png';
import Counter from '../Counter';
import Catcher from '../Catcher';
import Spinner from '../Spinner';

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


	state = {
		posts: [],
		isSpinnig: true,
		//posts: [{id: 'asdasdds', comment: 'Hello1'}, {id: 'asdasddsa', comment: 'Hello2'}, {id: 'sadasd', comment: 'Hello3'}],
	}

	_createPost = (comment) => {
		this.setState((prevState) => ({
			posts: [{ id: getUniqueID(), comment }, ...prevState.posts],
		})); 
		// esli ne ukazat' () to func ne budet vozvrashat' znachenie
	}

	_deletePost = (postID) => {
		this.setState(({posts}) => ({ //Destruktizaciya, pri vizove setState, pod kapotom peredaetsya prevState. Pri pomoshi destruktizaciya v prevState ishetsya posts, i izvlekaetsya 
			posts: posts.filter(post => post.id !== postID)
		})); 
	}

	render () {
		//this.props
		const { avatar, currentUserFirstName, currentUserLastName, comment } = this.props;
		const { posts, isSpinnig } = this.state;

		const postsJSX = posts.map((post) => (
			/* key vinosim navverx chobi react mog sledit' za izmineniem etogo komponenta*/
			<Catcher 
				key = { post.id }> 
				<Post
					avatar = { avatar }
					comment = { post.comment }
					_deletePost = { this._deletePost }  
					postID = { post.id }
				/>
			</Catcher>
		));

		return (
			<section className = { Styles.feed } >
				<StatusBar />
				<Composer 
					avatar = { avatar }  
					_createPost = { this._createPost }
				/>
				<Counter count = { posts.length } />
				{ postsJSX }
				<Spinner isSpinnig = { isSpinnig } />
			</section>
		);
	}
}