import * as accessTokenHeader from './../helpers/accessTokenHeader';
import loginReducer from './authenticationReducer';
import { ILoginState } from '../constants/authentication/authenticationInterfaces';
import * as types from '../actions/types/authenticationTypes';
import IAction from '../constants/common/IAction';
import { TokenDataModel } from '../models/authenticationModels';
import ErrorObject from '../constants/common/errorObject';

const validToken: boolean = accessTokenHeader.isAuth(false) && accessTokenHeader.isFreshToken();

describe('login reducer', () => {
    const initialLoginState: ILoginState = {
        isLoading: false,
        error: '',
        isAuthenticated: validToken,
        autoLogin: accessTokenHeader.isAuth(false)
    }

    const requestLoginState: ILoginState = {
        isLoading: true,
        error: '',
        isAuthenticated: false,
        autoLogin: false
    }
    
    it('should return the initial state', () => {
        const errorAction: IAction<types.ILoginActionType> = {
            type: 'NO_ACTION',
            payload: {
                error: {} as ErrorObject
            }
        }
        expect(loginReducer(undefined, errorAction)).toEqual(initialLoginState);
        expect(loginReducer(initialLoginState, errorAction)).toEqual(initialLoginState);
    })

    it('should handler LOGIN_REQUEST action', () => {

        const requestLoginAction: IAction<types.LOGIN_REQUEST> = {
            type: types.LOGIN_REQUEST,
            payload: {
                input: { email: 'olfa@yopmail.com', password: '123123' }
            }
        }
        expect(loginReducer(initialLoginState, requestLoginAction)).toEqual(requestLoginState);
    })

    it('should handler LOGIN_TOKEN_SUCCESS action', () => {
        const succesLoginState: ILoginState = {
            user: {} as TokenDataModel,
            isLoading: false,
            error: '',
            isAuthenticated: true,
            autoLogin: true
        }

        const succesLoginAction: IAction<types.LOGIN_TOKEN_SUCCESS> = {
            type: types.LOGIN_TOKEN_SUCCESS,
            payload: {
                user: {} as TokenDataModel
            }
        }
        expect(loginReducer(requestLoginState, succesLoginAction)).toEqual(succesLoginState);
    })

    it('should handler LOGIN_FAILED action', () => {
        const failLoginState: ILoginState = {
            isLoading: false,
            error: 'login failed',
            isAuthenticated: false,
            autoLogin: false
        }

        const failLoginAction: IAction<types.LOGIN_FAILED> = {
            type: types.LOGIN_FAILED,
            payload: {
                error: 'login failed'
            }
        }
        expect(loginReducer(requestLoginState, failLoginAction)).toEqual(failLoginState);
        expect(accessTokenHeader.isAuth(false) && accessTokenHeader.isFreshToken()).toEqual(false);
    })

    it('should handler LOGOUT action', () => {
        const logoutAction: IAction<types.LOGOUT> = {
            type: types.LOGOUT,
            payload: {}
        }
        expect(loginReducer(initialLoginState, logoutAction)).toEqual(initialLoginState);
        expect(accessTokenHeader.isAuth(false) && accessTokenHeader.isFreshToken()).toBeFalsy;
    })
})