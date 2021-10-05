import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ScreenHome from './pages/ScreenHome';
import ScreenArticlesBySource from './pages/ScreenArticlesBySource';
import ScreenMyArticles from './pages/ScreenMyArticles';
import ScreenSource from './pages/ScreenSource';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={ScreenHome} />
				<Route path='/sources' component={ScreenSource} />
				<Route
					path='/articlesBySource/:source'
					component={ScreenArticlesBySource}
				/>
				<Route path='/my-articles' component={ScreenMyArticles} />
			</Switch>
		</Router>
	);
}

export default App;
