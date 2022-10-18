import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const navlinks = [
   {
      text: 'ranking',
      to: '/ranks',
   },
   {
      text: 'kategorie',
      to: '/categories/all',
   },
   {
      text: 'zaloguj się',
      to: '/login',
   },
   {
      text: 'zarejestruj się',
      to: '/register',
   },
];

const NavLinks = () => {
   return (
      <ul className="nav-links">
         {navlinks.map((navlink) => (
            <li key={navlink.text}>
               <NavLink
                  to={navlink.to}
                  isActive={(match, location) => {
                     if (
                        location.pathname.indexOf('categories') > -1 &&
                        navlink.to === '/categories/all'
                     ) {
                        return true;
                     } else {
                        return navlink.to === location.pathname;
                     }
                  }}
               >
                  {navlink.text}
               </NavLink>
            </li>
         ))}
      </ul>
   );
};

export default NavLinks;
