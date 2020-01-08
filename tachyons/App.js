import React from 'react';
import CardList from './cardlist';
import SearchBox from './searchbox;'
import { robots } from './robots';

const App = () => {
	return (
		<div>
		<h1>robofriends</h1>
		</div>

		<CardList robots= {robots} />)
}