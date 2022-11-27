import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Auth from './authPage/pages/Auth';
import Categories from './categoriesPage/pages/Categories';
import ConfirmChoice from './taskPage/pages/ConfirmChoice';
import Footer from './shared/components/Footer/Footer';
import MainPage from './mainPage/pages/MainPage';
import NotFound from './shared/util/pages/NotFound';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Rank from './rankPage/pages/Rank';
import ScrollToTop from './shared/util/components/ScrollToTop';
import Task from './taskPage/pages/Task';

import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthProvider } from './shared/context/AuthContext.js';

const App = () => {
   return (
      <Router>
         <ScrollToTop>
            <AuthProvider>
               <div className="layout-wrapper">
                  <MainNavigation />
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
                     <PublicRoute path="/ranks" exact>
                        <Rank />
                     </PublicRoute>
                     <PrivateRoute path="/tasks/:category" exact>
                        <Categories />
                     </PrivateRoute>
                     <PrivateRoute path="/start/task/:taskId" exact>
                        <ConfirmChoice />
                     </PrivateRoute>
                     <PrivateRoute path="/task/:taskId" exact>
                        <Task />
                     </PrivateRoute>
                     <NotFound />
                  </Switch>
                  <Footer />
               </div>
            </AuthProvider>
         </ScrollToTop>
      </Router>
   );
};

export default App;
