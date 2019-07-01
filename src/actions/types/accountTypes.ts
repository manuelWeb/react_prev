// tslint:disable:interface-over-type-literal
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';
import ErrorObject from '../../constants/common/errorObject';

export const CREATE_ACCOUNT_REQUEST: string = 'CREATE_ACCOUNT_REQUEST';
export type CREATE_ACCOUNT_REQUEST = {
    account: CustomerInfoModel;
}

export const CREATE_ACCOUNT_SUCCESS: string = 'CREATE_ACCOUNT_SUCCESS';
export type CREATE_ACCOUNT_SUCCESS = {
    account: CustomerInfoModel;
}

export const CREATE_ACCOUNT_FAILURE: string = 'CREATE_ACCOUNT_FAILURE';
export type CREATE_ACCOUNT_FAILURE = {
    error: ErrorObject[];
}

export const GET_ACCOUNT_DATA_SUCCESS: string = 'GET_ACCOUNT_DATA_SUCCESS';
export type GET_ACCOUNT_DATA_SUCCESS = {
    accountData: CustomerInfoModel;
}
export type IAccountActionType = CREATE_ACCOUNT_REQUEST | CREATE_ACCOUNT_SUCCESS | CREATE_ACCOUNT_FAILURE | GET_ACCOUNT_DATA_SUCCESS