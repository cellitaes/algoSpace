import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const navlinks = [
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
   {
      text: 'zaloguj się',
      to: '/login',
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
