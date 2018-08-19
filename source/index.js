// Core
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Theme
import './theme/init';

import App from './containers/App';

ReactDOM.render(
    < App />, 
    document.getElementById('app')
);

// const H1 = <h1 title = 'A title!'> Hello Lectrum</h1>;

// const list = [...Array(10).keys()].map((item, index) => 
//     <li key = { index } >List item: { item } </li>
// );

// ReactDOM.render(<ul> { list } </ul>, document.getElementById('app'));


// ReactDOM.render(<ul> { undefined } </ul>, document.getElementById('app'));
// ReactDOM.render(<ul> { {name: 'John'} } </ul>, document.getElementById('app'));
// ReactDOM.render(<ul> { false } </ul>, document.getElementById('app'));
