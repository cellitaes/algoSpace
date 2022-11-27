import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../UIElements/Backdrop';
import Button from '../FormElements/Button';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';

import logo from '../../../static/images/AlgoSpace-logo.png';
import { AuthContext } from '../../context/AuthContext.js';

const MainNavigation = () => {
   const [drawerIsOpen, setDrawerIsOpen] = useState(false);

   const { isLoggedIn, logout } = useContext(AuthContext);

   const openDrawerHandler = () => {
      setDrawerIsOpen(true);
   };

   const closeDrawerHandler = () => {
      setDrawerIsOpen(false);
   };

   return (
      <>
         {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
         <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
               <NavLinks />
            </nav>
         </SideDrawer>

         <MainHeader>
            <button
               className="main-navigation__menu-btn"
               onClick={openDrawerHandler}
            >
               <span />
               <span />
               <span />
            </button>
            <div className="main-navigation__logo">
               <Link to="/">
                  <img src={logo} alt={'logo'} />
               </Link>
            </div>
            <div className="main-navigation__login-button">
               {isLoggedIn ? (
                  <Button onClick={logout} size={'xs'}>
                     Wyloguj się
                  </Button>
               ) : (
                  <Button to="/login" size={'xs'}>
                     Zaloguj się
                  </Button>
               )}
            </div>
            <nav className="main-navigation__header-nav">
               <NavLinks />
            </nav>
         </MainHeader>
      </>
   );
};

export default MainNavigation;
