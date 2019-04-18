import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import News from './News';
import Contacts from './Contacts';

export default () => <>
	<Route path="/" exact component={Home} />
	<Route path="/news" component={News} />
	<Route path="/contacts" component={Contacts} />
</>;