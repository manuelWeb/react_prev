import * as actionTypes from '../actions/types/forgotPasswordTypes';
import IAction from '../constants/common/IAction';
import { accountService } from '../services/accountService';
import { Dispatch } from 'redux';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import { ForgotPasswordModel } from '../models/forgotPasswordModel';
import ErrorObject from '../constants/common/errorObject';
import { alertActions } from './alertActions';

const forgotPasswordActions = {
  requestToken
}

export default forgotPasswordActions;

/**
 * Appelle le service qui demande à l'API de réinitialiser le mot de passe d'un client.
 * @param payload Email ou numéro du client.
 * @returns
 */
function requestToken(payload: string): AsyncVoidPromiseAction<Promise<ForgotPasswordModel>, void> {
  return (dispatch: Dispatch<IAction<any>>): Promise<void> => {
    dispatch(sendRequest());

    const pattern: string = '^[0-9]{1,}$';
    const regexCustomerNumber: RegExp = new RegExp(pattern);
    const isCustomerNumber: boolean = regexCustomerNumber.test(payload);

    const promise: Promise<ForgotPasswordModel> =
      isCustomerNumber ?
        accountService.getResetPasswordTokenWithCustomerNumber(payload)
        : accountService.getResetPasswordTokenWithEmail(payload);

    return promise.then((response: ForgotPasswordModel) => {
      const isRequestSuccessfull: boolean = !response.isError;

      dispatch(sendRequestResult(actionTypes.FORGOT_PASSWORD_SUCCESS, isRequestSuccessfull));
    }).catch((error: ErrorObject) => {
      dispatch(sendRequestResult(actionTypes.FORGOT_PASSWORD_FAILURE, false));

      if (error !== undefined) {
        dispatch(alertActions.error(error.toString()));
      }

      // dispatch(errorHandler.handleHTTPError(error, props));
    })
  }
}

/**
 * Créé une action pour signaler l'envoi d'une requête à l'API
 * @returns {IAction<null>} Action créée.
 */
export function sendRequest(): IAction<null> {
  return {
    type: actionTypes.FORGOT_PASSWORD_REQUEST,
    payload: null
  }
}

/**
 * Créé une action lors l'API a répondu.
 * @param actionType Type de l'action à créer.
 * @param isRequestSuccessfull Booléen  qui indique si l'API a répondu avec succès ou en erreur.
 * @returns {IAction<boolean>} Action créée.
 */
export function sendRequestResult(actionType: string, isRequestSuccessfull: boolean): IAction<boolean> {
  return {
    type: actionType,
    payload: isRequestSuccessfull
  }
}