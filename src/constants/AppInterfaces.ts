import { IHomeState } from '../reducers/homeReducer';
import { ILoginState } from '../constants/authentication/authenticationInterfaces';
import { IForgotPasswordState, IResetPasswordState } from './ForgotPasswordInterfaces';
import { IErrorState } from './error/IErrorState';
import { IAccountState } from './account/IAccount';
import IAlertState from './alert/alertInterfaces';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';

// type T = CustomerInfoModel | CustomerGetDataModel;
export interface IAppState {
  home: IHomeState,
  login: ILoginState,
  forgotPassword: IForgotPasswordState,
  resetPassword: IResetPasswordState,
  error: IErrorState,
  account: IAccountState<CustomerInfoModel>,
  alert: IAlertState
}