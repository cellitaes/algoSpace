import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import MainPage from './mainPage/pages/MainPage';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Routes from './Routes';

import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
   return (
      <Router>
         <MainNavigation />
         <Switch>
            {/* <PublicRoute path="/login" exact>
               <Welcome />
            </PublicRoute> */}
            <PublicRoute path="/" exact>
               <MainPage />
            </PublicRoute>
            {/* <PrivateRoute path="/main">
               <Routes />
            </PrivateRoute> */}
         </Switch>
      </Router>
   );
};

export default App;
