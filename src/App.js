import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Footer from './shared/components/Footer/Footer';
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
         <div className="layout-wrapper">
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
            <Footer />
         </div>
      </Router>
   );
};

export default App;
