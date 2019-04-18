import React from 'react';
import { Route } from 'react-router-dom';
import Admin from './Home';

export default () => <>
	<Route path="/admin" component={Admin} />
</>;