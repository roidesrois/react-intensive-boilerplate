import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanceable) => 
	class WithProfile extends Component {
		render () {
			return (
				<Consumer>
					{
						context => <Enhanceable { ...context } { ...this.props } />
					}
				</Consumer>
			)
		}
	}

export {
	Provider,
	Consumer,
	withProfile
}


// const  context = React.createContext();

// const {	Provider, Consumer } = context;

// console.log(context);

// export {
// 	Provider,
// 	Consumer
// }