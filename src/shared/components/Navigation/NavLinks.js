import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../context/AuthContext';

import './NavLinks.css';

const NavLinks = () => {
   const { isLoggedIn, userId, logout } = useContext(AuthContext);

   const loggedInNavlinks = [
      {
         text: 'ranking',
         to: '/ranks',
      },
      {
         text: 'Zadania',
         to: '/tasks/all',
      },
      {
         text: 'Historia rozwiązań',
         to: '/solution-history',
      },
      {
         text: 'Wyloguj się',
         to: '#',
         onClick: logout,
      },
   ];

   const notLoggedInNavlinks = [
      {
         text: 'ranking',
         to: '/ranks',
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

   const navlinks = isLoggedIn ? loggedInNavlinks : notLoggedInNavlinks;

   return (
      <ul className="nav-links">
         {navlinks.map((navlink) => (
            <li key={navlink.text}>
               <NavLink
                  onClick={navlink.onClick}
                  to={navlink.to}
                  isActive={(match, location) => {
                     if (
                        location.pathname.indexOf('tasks') > -1 &&
                        navlink.to === '/tasks/all'
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
            <>
               <li className="user-profile">
                  <span className="user-profile__greetings">{userId}</span>
                  <FontAwesomeIcon icon={faUser} />
               </li>
            </>
         )}
      </ul>
   );
};

export default NavLinks;
