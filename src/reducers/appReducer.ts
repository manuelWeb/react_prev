import { combineReducers } from 'redux';
import { homeReducer } from '../reducers/homeReducer';
import loginReducer from './authenticationReducer';
import { forgotPasswordReducer } from './forgotPasswordReducer';
import { resetPasswordReducer } from './resetPasswordReducer';
import { IAppState } from '../constants/AppInterfaces';
import errorReducer from './errorReducer';
import accountReducer from './accountReducer'
import alertReducer from './alertReducer';

/**
 * Reducer global de l'application.
 */
const reducer = combineReducers<IAppState>({
  home: homeReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  error: errorReducer,
  account: accountReducer,
  alert: alertReducer
})

export default reducer;