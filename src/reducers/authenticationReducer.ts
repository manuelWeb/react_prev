import { ILoginState } from '../constants/authentication/authenticationInterfaces';
import * as types from './../actions/types/authenticationTypes';
import IAction from '../constants/common/IAction';
import * as accessTokenHeader from './../helpers/accessTokenHeader';

const validToken: boolean = accessTokenHeader.isAuth(false) && accessTokenHeader.isFreshToken();

const initialState: ILoginState = {
    error: '',
    isLoading: false,
    isAuthenticated: validToken,
    autoLogin: accessTokenHeader.isAuth(false)
};

export default function loginReducer(state: ILoginState = { ...initialState }, action: IAction<types.ILoginActionType>): ILoginState {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case types.LOGIN_TOKEN_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, autoLogin: true, user: (action.payload as types.LOGIN_TOKEN_SUCCESS).user }
        case types.LOGIN_FAILED:
            return { ...state, isLoading: false, isAuthenticated: false, autoLogin: false, error: (action.payload as types.LOGIN_FAILED).error }
        case types.LOGOUT:
            return { error: '', isLoading: false, isAuthenticated: false, autoLogin: false }
        default:
            return { ...state, isAuthenticated: accessTokenHeader.isAuth(false) && accessTokenHeader.isFreshToken() }
    }
}