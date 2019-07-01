import Home from './pages/homePage';
import Login from './pages/authenticationPage';
import ForgotPassword from './pages/forgotPasswordPage';
import ResetPassword from './pages/resetPasswordPage';
import CreateAccount from './pages/createAccountPage';
import Account from './pages/accountPage';
import ClientError from './pages/clientError';
import IRoute from './constants/common/route';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/Login',
    exact: true,
    component: Login,
    unauthenticatedOnly: true,
    redirectTo: '/Account'
  },
  {
    path: '/ForgotPassword',
    exact: true,
    component: ForgotPassword,
    unauthenticatedOnly: true, 
    redirectTo: '/Account'
  },
  {
    path: '/ResetPassword',
    exact: true,
    component: ResetPassword,
    unauthenticatedOnly: true, 
    redirectTo: '/Account'
  },
  {
    path: '/CreateAccount',
    exact: true,
    component: CreateAccount,
    unauthenticatedOnly: true,
    redirectTo: '/Account'
  },
  {
    path: '/Account',
    exact: true,
    component: Account,
    private: true
  },
  {
    path: '/400',
    exact: true,
    component: ClientError
  }
]

export default routes;
