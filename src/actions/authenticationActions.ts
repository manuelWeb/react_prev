import IAction from './../constants/common/IAction';
import { Dispatch } from 'redux';
import loginService from '../services/authenticationService';
import { alertActions } from './alertActions';
import { ILoginCredentialsModel, TokenDataModel } from '../models/authenticationModels';
import { LOGIN_REQUEST, LOGIN_TOKEN_SUCCESS, LOGIN_FAILED, LOGOUT } from './types/authenticationTypes';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import { errorActions } from './errorHandlerActions';
import ErrorObject from '../constants/common/errorObject';
import { History } from 'history';
import { API_AUTH } from '../services/api/apiActions';
import appStore from '../app/appStore';

export const loginActions = {
    login,
    getFreshToken,
    logout
};
export default loginActions;

/**
 * Permet d'authentifier un utilisateur via ses credentials
 * @param loginIput credentials de l'utisateur : mail + pwd
 * @param propsHistory Le Browser History requis pour les redirections 500/400
 * @returns dispatch des actions pour mettre à jour le state
 */
export function login(loginIput: ILoginCredentialsModel, propsHistory: History): AsyncVoidPromiseAction<Promise<TokenDataModel>, any> {
    return (dispatch: Dispatch<IAction<any>>): Promise<void> => {
        dispatch(loginRequest(loginIput));
        return loginService.apiLoginAsync(loginIput, API_AUTH.GRANT_TYPE.PASSWORD)
            .then((user: TokenDataModel) => {
                dispatch(grantCredentialsSuccess(user));
            }).catch((error: ErrorObject) => {
                errorActions.handleHTTPError(error, propsHistory)(dispatch);
                dispatch(loginFailed(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    };
}

/**
 * Demande d'un token valid. Si le token en session est utilisateur => refresh token sinon demander un nouveau token anonyme
 * @param refreshToken Chaine de caractère permettant de rafraichir un token utilisateur
 * @returns retourne un access token valid
 */
export async function getFreshToken(refreshToken?: string): Promise<string> {
    try {
        let tokenData: TokenDataModel;
        if (refreshToken !== undefined) {
            tokenData = await loginService.apiLoginAsync(undefined, API_AUTH.GRANT_TYPE.REFRESH_TOKEN, refreshToken);
            appStore.dispatch(grantCredentialsSuccess(tokenData));
        } else {
            tokenData = await loginService.apiLoginAsync();
        }
        if (tokenData && tokenData.AccessToken.length > 0) {
            return tokenData.AccessToken;
        }
    } catch (ex) {
        localStorage.removeItem('AccessToken');
    }
    return '';
}

export function loginRequest(loginInput: ILoginCredentialsModel): IAction<LOGIN_REQUEST> {
    return {
        type: LOGIN_REQUEST,
        payload: {
            input: loginInput
        }
    }
}

export function grantCredentialsSuccess(loginUser: TokenDataModel): IAction<LOGIN_TOKEN_SUCCESS> {
    return {
        type: LOGIN_TOKEN_SUCCESS,
        payload: {
            user: loginUser
        }
    }
}

export function loginFailed(loginError: string): IAction<LOGIN_FAILED> {
    return {
        type: LOGIN_FAILED,
        payload: {
            error: loginError
        }
    }
}

export function logout(): IAction<LOGOUT> {
    localStorage.removeItem('AccessToken');
    sessionStorage.removeItem('CustomerData');
    return {
        type: LOGOUT,
        payload: {
        }
    }
}