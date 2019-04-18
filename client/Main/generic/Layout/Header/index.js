import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => <header>
	<nav>
		<ul>
			<li><NavLink to="/">Главная</NavLink></li>
			<li><NavLink to="/news">Новости</NavLink></li>
			<li><NavLink to="/contacts">Контакты</NavLink></li>
		</ul>
	</nav>
</header>

export default Header;
