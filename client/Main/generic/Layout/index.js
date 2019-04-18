import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title }) => <div>
	<Helmet>
		<title>{title}</title>
	</Helmet>
	
	<Header />
	{children}
	<Footer />
</div>

export default Layout;
