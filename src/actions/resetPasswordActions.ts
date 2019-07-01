import * as actionTypes from '../actions/types/resetPasswordTypes';
import IAction from '../constants/common/IAction';
import { accountService } from '../services/accountService';
import { Dispatch } from 'redux';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import ErrorObject from '../constants/common/errorObject';
import { alertActions } from './alertActions';
import IRetourAppelDTO from '../services/interfaces/retourAppelDTO';

const resetPasswordActions = {
  reinitPassword
}

export default resetPasswordActions;

/**
 * Réinitialiser un mot de passe.
 * @param token Jeton de réinitialisation.
 * @param password Nouveau mot de passe.
 * @param passwordConfirmation Confirmation du nouveau mot de passe.
 * @returns {AsyncVoidPromiseAction<Promise<ForgotPasswordModel>, void>}
 */
function reinitPassword(token: string, password: string, passwordConfirmation: string): AsyncVoidPromiseAction<Promise<IRetourAppelDTO>, void> {
  return (dispatch: Dispatch<IAction<any>>): Promise<void> => {
    dispatch(sendRequest());

    return accountService.resetPassword(token, password, passwordConfirmation).then((response: IRetourAppelDTO) => {
      const isRequestSuccessfull: boolean = !response.erreur;

      dispatch(sendRequestResult(actionTypes.RESET_PASSWORD_SUCCESS, isRequestSuccessfull));
    }).catch((error: ErrorObject) => {
      dispatch(sendRequestResult(actionTypes.RESET_PASSWORD_FAILURE, false));

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
    type: actionTypes.RESET_PASSWORD_REQUEST,
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