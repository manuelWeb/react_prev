
import ErrorObject from '../common/errorObject';
import { ILoginState } from '../authentication/authenticationInterfaces';
import { ILoginCredentialsModel, TokenDataModel } from '../../models/authenticationModels';
import { AsyncVoidPromiseAction } from '../common/typeFactory';
import IAction from '../common/IAction';
import { LOGOUT } from '../../actions/types/authenticationTypes';
import { History } from 'history';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

export interface ICreateAccountProps {
   history: History;
   customerInfo: CustomerInfoModel;
   createAccount: (account: CustomerInfoModel, propsHistory: History) => AsyncVoidPromiseAction<Promise<CustomerInfoModel>, Promise<void>>;
}

export interface IAccountState<T> {
   readonly account: T,
   readonly error: ErrorObject[]
}

export interface IAccountProps extends ILoginState {
   history: History;
   logout: () => IAction<LOGOUT>;
   customerInfo: IAccountState<CustomerInfoModel>;
   login(user: ILoginCredentialsModel, history: History): AsyncVoidPromiseAction<Promise<TokenDataModel>, any>
}

export interface ICustomerProps extends ILoginState {
   history: History;
   logout?: () => void;
   customerInfo: CustomerInfoModel;
   getCustomerInfos(propsHistory: History): AsyncVoidPromiseAction<Promise<CustomerInfoModel>, void>;
}
