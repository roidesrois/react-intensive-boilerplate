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
import { api } from '../../REST/api';
import { socket } from '../../socket';
import { GROUP_ID } from '../../REST';

export default class Feed extends Component {
	static propTypes = {
		avatar: 				string.isRequired,
		currentUserFirstName: 	string.isRequired,
		currentUserLastName: 	string.isRequired,
	};

	state = {
		posts: [],
		isSpinnig: false,
		//posts: [{id: 'asdasdds', comment: 'Hello1'}, {id: 'asdasddsa', comment: 'Hello2'}, {id: 'sadasd', comment: 'Hello3'}],
	}

	componentDidMount () {
		this._fetchPostsAsync();

		socket.emit('join', GROUP_ID);
	}

	_setPostsFetchingState = (isSpinnig) => {
		this.setState({
			isSpinnig,
		});
	}

	_fetchPostsAsync = async () => {
		try {
			this._setPostsFetchingState(true);

			// dannie posti uje prishli s servera
			const posts = await api.fetchPosts();

			this.setState(() => ({
				posts,
			}))
		} catch (error) {
			console.error(error);
		} finally {
			this._setPostsFetchingState(false);
		}
	}

	_createPostAsync = async (comment) => {
		try {
			this._setPostsFetchingState(true);

			const post = await api.createPost(comment);

			this.setState((prevState) => ({
				posts: [ post, ...prevState.posts ],
			})); 
		} catch (error) {
			console.error();
		} finally {
			this._setPostsFetchingState(false);
		}

		// this.setState((prevState) => ({
		// 	posts: [{ id: getUniqueID(), comment }, ...prevState.posts],
		// })); 
		// esli ne ukazat' () to func ne budet vozvrashat' znachenie
	}

	_removePostAsync = async (id) => {
		try {
			this._setPostsFetchingState(true);

			await api.removePost(id);

			this.setState(({ posts }) => ({
				posts: posts.filter((post) => post.id !== id),
			}));
		} catch (error) {
			console.error(error);
		} finally {
			this._setPostsFetchingState(false);
		}
	}

	_likePostAsync = async (id) => {
		try {
			this._setPostsFetchingState(true);

			const likePost = await api.likePost(id);

			this.setState(({ posts }) => ({
				posts: posts.map((post) => post.id === likePost.id ? likePost: post),
			}));
		} catch (error) {
			console.error(error);
		} finally {
			this._setPostsFetchingState(false);
		}
	}

	// _deletePost = (postID) => {
	// 	this.setState(({posts}) => ({ //Destruktizaciya, pri vizove setState, pod kapotom peredaetsya prevState. Pri pomoshi destruktizaciya v prevState ishetsya posts, i izvlekaetsya 
	// 		posts: posts.filter(post => post.id !== postID)
	// 	})); 
	// }

	render () {
		//this.props
		const { avatar, currentUserFirstName, currentUserLastName, comment } = this.props;
		const { posts, isSpinnig } = this.state;

		const postsJSX = posts.map((post) => (
			/* key vinosim navverx chobi react mog sledit' za izmineniem etogo komponenta*/
			<Catcher 
				key = { post.id }> 
				<Post
					{ ...post }
					_removePostAsync = { this._removePostAsync }
					_likePostAsync = { this._likePostAsync }
				/>
			</Catcher>
		));

		return (
			<section className = { Styles.feed } >
				<StatusBar />
				<Composer 
					avatar = { avatar }  
					_createPostAsync = { this._createPostAsync }
				/>
				<Counter count = { posts.length } />
				{ postsJSX }
				<Spinner isSpinnig = { isSpinnig } />
			</section>
		);
	}
}