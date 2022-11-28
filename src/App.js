import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './shared/components/Footer/Footer';
import Routes from './Routes';
import ScrollToTop from './shared/util/components/ScrollToTop';

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
                  <Routes />
                  <Footer />
               </div>
            </AuthProvider>
         </ScrollToTop>
      </Router>
   );
};

export default App;
