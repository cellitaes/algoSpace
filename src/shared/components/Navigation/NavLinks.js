import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import './NavLinks.css';

const loggedInNavlinks = [
   {
      text: 'ranking',
      to: '/ranks',
   },
   {
      text: 'Zadania',
      to: '/tasks/all',
   },
];

const notLoggedInNavlinks = [
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
   const { isLoggedIn, logout } = useContext(AuthContext);

   const navlinks = isLoggedIn ? loggedInNavlinks : notLoggedInNavlinks;

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
         {isLoggedIn && (
            <li className="user-profile">
               <i class="fa-solid fa-user"></i>
               <div className="dropdown-content">
                  <a href="#">Profil</a>
                  <a onClick={logout}>wyloguj się</a>
               </div>
            </li>
         )}
      </ul>
   );
};

export default NavLinks;
