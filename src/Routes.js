import { Switch } from 'react-router-dom';

import Auth from './authPage/pages/Auth';
import Categories from './categoriesPage/pages/Categories';
import ConfirmChoice from './taskPage/pages/ConfirmChoice';
import MainPage from './mainPage/pages/MainPage';
import NotFound from './shared/util/pages/NotFound';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Rank from './rankPage/pages/Rank';
import SubmissionCode from './solutionHistoryPage/pages/SubmissionCode';
import SolutionHistory from './solutionHistoryPage/pages/SolutionHistory';
import Task from './taskPage/pages/Task';

const Routes = () => {
   return (
      <>
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
            <PrivateRoute path="/solution-history" exact>
               <SolutionHistory />
            </PrivateRoute>
            <PrivateRoute path="/task-submission/:taskId/:solver" exact>
               <SubmissionCode />
            </PrivateRoute>
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
      </>
   );
};

export default Routes;
