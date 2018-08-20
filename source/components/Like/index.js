import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

import Styles from './styles.m.css';
import { withProfile } from '../../HOC/withProfile';

export class Like extends Component {
    static propTypes = {
        _likePostAsync: func.isRequired,
        id:             string.isRequired,
        likes:          arrayOf(
            shape({
            	id: 	   string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            })
        )
    };

    static defaultProps = {
        likes: [],
    }

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState(() => ({
            showLikers: true,
        }));
    }

    _hideLikers = () => {
        this.setState(() => ({
            showLikers: false,
        }));
    }

    _likePost = () => {
        const { _likePostAsync, id } = this.props;

        _likePostAsync(id);
    }

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => 
            `${firstName} ${lastName}` ===
            `${currentUserFirstName} ${currentUserLastName}`
        );
    }

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    }

    _getLikersList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => (
            <li key = { id } >{firstName} {lastName}</li>
        ));

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;
        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and 1 other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    }

    render () {
        //vizivaem eti metodi imenno v rendere dlya dinamiki
        const likers = this._getLikersList();
        const likeStyles = this._getLikeStyles();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    { likers }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        { likesDescription }
                    </span>
                </div>
            </section>
        )
    }
}

export default withProfile(Like);