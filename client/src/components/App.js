// React side of the application
import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// const Header = () => <h2> Header </h2>;
//const Dashboard = () => <h2> Dashboard </h2>;
//const SurveyNew = () => <h2> SurveyNew </h2>;


class App extends Component{

	// component will mount will get called multiple times in future.
	// component will mount and did mount time difference is almost nil.
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
	return (
		<div className="container"> 
			<BrowserRouter> 
				<div>
					<Header/>
					<Route exact path="/" component={Landing}/> 
					<Route exact path="/surveys" component={Dashboard}/>
					<Route path="/surveys/new" component={SurveyNew}/>
				</div>
			</BrowserRouter>
		</div>

	)}
}

export default connect(null, actions)(App);

//export default App;