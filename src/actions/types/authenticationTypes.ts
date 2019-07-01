import { TokenDataModel, ILoginCredentialsModel } from '../../models/authenticationModels';

// tslint:disable:interface-over-type-literal

export const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export type LOGIN_REQUEST = {
    input: ILoginCredentialsModel;
}

export const LOGIN_TOKEN_SUCCESS: string = 'LOGIN_TOKEN_SUCCESS';
export type LOGIN_TOKEN_SUCCESS = {
    user: TokenDataModel;
}

export const LOGIN_FAILED: string = 'LOGIN_FAILED';
export type LOGIN_FAILED = {
    error: string;
}

export const LOGOUT: string = 'LOGOUT';
export type LOGOUT = {
}

export type ILoginActionType = LOGIN_REQUEST | LOGIN_TOKEN_SUCCESS | LOGIN_FAILED | LOGOUT