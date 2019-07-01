import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import { accountService } from '../services/accountService';
import IAction from '../constants/common/IAction';
import { Dispatch } from 'redux';
import * as types from './types/accountTypes';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import { History } from 'history';
import { alertActions } from './alertActions';
import { errorActions } from './errorHandlerActions';
import loginService from '../services/authenticationService';
import { TokenDataModel } from '../models/authenticationModels';
import { grantCredentialsSuccess, loginFailed } from './authenticationActions';
import history from '../helpers/history';
import { isAuth, isFreshToken } from '../helpers/accessTokenHeader';

export const accountActions = {
    createAccount,
    createAccountRequest,
  getCustomerInfo,
  getCustomerSuccess
}

function createAccount(account: CustomerInfoModel, propsHistory: History): AsyncVoidPromiseAction<Promise<any>, any> {
    return (dispatch: Dispatch<IAction<any>>): Promise<void> => {
        dispatch(createAccountRequest(account));
        return accountService.createAccount(account).then(() => {
            return loginService.apiLoginAsync({ email: account.EmailAdress, password: account.ConnexionClient.Password }, 'password')
                .then((user: TokenDataModel) => {
                    dispatch(grantCredentialsSuccess(user));
                    history.push('/Account');
                });
        }).catch(error => {
            dispatch(alertActions.error(error.toString()));
            errorActions.handleHTTPError(error, propsHistory)(dispatch);
        })
    };
}

function createAccountRequest(accountCreate: CustomerInfoModel): IAction<types.CREATE_ACCOUNT_REQUEST> {
    return {
        type: types.CREATE_ACCOUNT_REQUEST,
        payload: {
            account: accountCreate
        }
    }
}

function getCustomerInfo(propsHistory: History): AsyncVoidPromiseAction<Promise<CustomerInfoModel>, void> {
    return (dispatch: Dispatch<IAction<any>>): Promise<void> => {
        const storedCustomer = sessionStorage.getItem('CustomerData');
        if (storedCustomer && isAuth(false) && isFreshToken()) {
            return new Promise<void>(() => {
                const cusData: CustomerInfoModel = JSON.parse(storedCustomer);
                dispatch(getCustomerSuccess(cusData));
            })
        } else {
            return accountService.apiGetCustomerByIdAsync().then((customerData: CustomerInfoModel) => {
                sessionStorage.setItem('CustomerData', JSON.stringify(customerData));
                dispatch(getCustomerSuccess(customerData));
            }).catch(error => {
                dispatch(loginFailed(error.toString()));
                dispatch(alertActions.error(error.stack));
                errorActions.handleHTTPError(error, propsHistory)(dispatch);
            })
        }
    };
}

function getCustomerSuccess(customerData: CustomerInfoModel): IAction<types.GET_ACCOUNT_DATA_SUCCESS> {
    return {
        type: types.GET_ACCOUNT_DATA_SUCCESS,
        payload: {
            accountData: customerData
        }
    }
}