import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Auth from './authPage/pages/Auth';
import Categories from './categoriesPage/pages/Categories';
import ConfirmChoice from './taskPage/components/ConfirmChoice';
import Footer from './shared/components/Footer/Footer';
import MainPage from './mainPage/pages/MainPage';
import NotFound from './shared/util/pages/NotFound';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Routes from './Routes';
import Task from './taskPage/pages/Task';

import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
   return (
      <Router>
         <MainNavigation />
         <div className="layout-wrapper">
            <Switch>
               <PublicRoute path="/" exact>
                  <MainPage />
               </PublicRoute>
               <PublicRoute path="/register" exact>
                  <Auth />
               </PublicRoute>
               <PublicRoute path="/login" exact>
                  <Auth />
               </PublicRoute>
               <PublicRoute path="/categories/:category" exact>
                  <Categories />
               </PublicRoute>
               <PublicRoute path="/start/task/:taskId" exact>
                  <ConfirmChoice />
               </PublicRoute>
               <PublicRoute path="/task/:taskId" exact>
                  <Task />
               </PublicRoute>
               <NotFound />
            </Switch>
            <Footer />
         </div>
      </Router>
   );
};

export default App;
