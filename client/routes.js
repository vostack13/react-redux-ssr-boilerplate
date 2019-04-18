import React from 'react';
import { Switch } from 'react-router-dom';
import mainRoutes from './Main/routes';
import adminRoutes from './Admin/routes';

const App = () => <Switch>
	<>
		{mainRoutes()}
		{adminRoutes()}
	</>
</Switch>;

export default App;