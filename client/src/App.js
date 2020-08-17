import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './assets/css/App.scss';
import Home from './components/Home';
import Error from './components/Error';

function App() {
	
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route component={Error}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
