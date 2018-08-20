import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';
import { Provider } from '../../HOC/withProfile';
import avatar from '../../theme/assets/homer.png';

const config = {
	avatar,
	currentUserFirstName: 'Руслан',
	currentUserLastName: 'Салимов',
};

//pri izminenii obnovlyaet block bez perezagruzki
@hot(module)
export default class App extends Component {
	render () {
		return (
			<Catcher>
				<Provider value = { config } >
					<Feed { ...config } />
				</Provider>
			</Catcher>
		);
	}
}