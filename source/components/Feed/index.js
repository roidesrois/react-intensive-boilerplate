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
import gsap from 'gsap';

import { 
	Transition, 
	CSSTransition, 
	TransitionGroup 
} from 'react-transition-group';

import Postman from '../Postman';
 
export default class Feed extends Component {
	static propTypes = {
		avatar: 				string.isRequired,
		currentUserFirstName: 	string.isRequired,
		currentUserLastName: 	string.isRequired,
	};

	state = {
		posts: [],
		isSpinnig: false,
       	isPostmanAppear: true,
		//posts: [{id: 'asdasdds', comment: 'Hello1'}, {id: 'asdasddsa', comment: 'Hello2'}, {id: 'sadasd', comment: 'Hello3'}],
	}

	componentDidMount () {

//window.setInterval(() => { const message = moment().format('MMMM D h:mm:ss a'); this._createPostAsync(message); }, 60000/19);
//window.setInterval(() => { this._createPostAsync('hi there'); }, 60000/19);
		// setTimeout(() => {
		// 	this.setState({
		// 		isPostmanAppear: false
		// 	});
		// }, 4000);

		const { currentUserFirstName, currentUserLastName} = this.props;
		this._fetchPostsAsync();

		socket.emit('join', GROUP_ID);

		socket.on('create', (postJSON) => {
		 // post содержит объект созданного поста любым участником группы.
		 // Текст в формате JSON

		 	const { data: createdPost, meta } = JSON.parse(postJSON);

		 	console.log(createdPost);

		 	// delaem proverku, tak kak create proisxodit i po REST i po Socketu, chtobi ne sozdavalis' po 2 posta
		 	if (`${currentUserFirstName} ${currentUserLastName}`
		 		!== `${createdPost.firstName} ${createdPost.lastName}`) {
		 		this.setState(({ posts }) => ({
		 			posts: [createdPost, ...posts]
		 		}))
		 	}
		});


		socket.on('remove', (postData) => {
			// postId содержит ID удалённого поста.
			const { data: { id }, meta } = JSON.parse(postData);

		 	if (`${currentUserFirstName} ${currentUserLastName}`
		 		!== `${meta.authorFirstName} ${meta.authorLastName}`) {

		 		this.setState(({ posts }) => ({
		 			posts: posts.filter((post) => post.id !== id)
		 		}));
		 	}
		});

		socket.on('like', (postData) => {
			// postId содержит ID удалённого поста.
			const { data: createdPost, meta } = JSON.parse(postData);

		 	if (`${currentUserFirstName} ${currentUserLastName}`
		 		!== `${meta.authorFirstName} ${meta.authorLastName}`) {

		 		this.setState(({ posts }) => ({
		 			posts: posts.map((post) => post.id === createdPost.id ? createdPost : post)
		 		}));
		 	}
		})
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


	_animateComposerEnter = (composer) => {
		// element, animation in seconds, { from point, to point}
		gsap.fromTo(composer, 1, 
			{
				opacity: 0,
				x: '-1000',
			},
			{
				opacity: 1,
				x: '0'
			}
		);
	}


    _handlePostmanAppear = (postman) => {
        gsap.fromTo(postman, 2,
            {
                opacity: 0,
                x: 400,
            },
            {
                opacity: 1,
                x: 0,
                onComplete: () => {
                    setTimeout(() => {
                        this.setState(() => ({
                            isPostmanAppear: false
                        }));
                    }, 5000);
                },
            }
        );
    }

    _handlePostmanDisappear = (postman) => {
        gsap.fromTo(postman, 2,
            {
                opacity: 1,
                x: 0,
            },
            {
                opacity: 0,
                x: 400
            }
        );
    }



	render () {
		//this.props
		const { avatar, currentUserFirstName, currentUserLastName, comment } = this.props;
		const { posts, isSpinnig, isPostmanAppear  } = this.state;

		const postsJSX = posts.map((post) => (
			/* key vinosim navverx chobi react mog sledit' za izmineniem etogo komponenta*/
			<CSSTransition 
				classNames = { {
					enter: 			Styles.postInStart,
					enterActive: 	Styles.postInEnd,
					exit: 			Styles.postOutStart,
					exitActive: 	Styles.postOutEnd,
				} }
				timeout = { 1000 }
				key = { post.id } >
				<Catcher> 
					<Post
						{ ...post }
						_removePostAsync = { this._removePostAsync }
						_likePostAsync = { this._likePostAsync }
					/>
				</Catcher>
			</CSSTransition>
		));

		return (
			<section className = { Styles.feed } >
				<StatusBar />
				<Transition
					appear
					in
					timeout = { 1000 } //milisekundi
					onEnter = { this._animateComposerEnter }>

					<Composer 
						avatar = { avatar }  
						_createPostAsync = { this._createPostAsync }
					/>
				</Transition>

		{/*   { isDelay && */}
              	<Transition
                    appear
                    in = { isPostmanAppear }
                    timeout = { 2000 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear } >
                    <Postman 
                        avatar = { avatar }
                        currentUserFirstName = { currentUserFirstName }
                    />
                </Transition>
		{/*   } */}
				<Counter count = { posts.length } />
				<TransitionGroup>
					{ postsJSX }
				</TransitionGroup>
				<Spinner isSpinnig = { isSpinnig } />
			</section>
		);
	}
}