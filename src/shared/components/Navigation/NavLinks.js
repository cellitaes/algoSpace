import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const navlinks = [
   {
      text: 'zarejestruj się',
      to: '/register',
   },
   {
      text: 'zaloguj się',
      to: '/login',
   },
   {
      text: 'zadania',
      to: '/tasks',
   },
   {
      text: 'ranking',
      to: '/ranks',
   },
   {
      text: 'forum',
      to: '/forum',
   },
   {
      text: 'lekcje',
      to: '/lessons',
   },
   {
      text: 'kategorie',
      to: '/categories',
   },
];

const NavLinks = (props) => {
   return (
      <ul className="nav-links">
         {navlinks.map((navlink) => (
            <li key={navlink.text}>
               <NavLink to={navlink.to} exact>
                  {navlink.text}
               </NavLink>
            </li>
         ))}
      </ul>
   );
};

export default NavLinks;
