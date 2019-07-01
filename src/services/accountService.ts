import { promiseHelpersAction } from '../helpers/promiseHelper';
import { ForgotPasswordModel } from '../models/forgotPasswordModel';
import ErrorObject from '../constants/common/errorObject';
import { IRetourAppelCreationClientDTO, CustomerPersoInfo } from './interfaces/customer';
import IRetourAppelCreationJetonReinitialisationMdp from './interfaces/retourAppelCreationJetonReinitialisationMdp';
import { ICustomerData } from './interfaces/authentication';
import fetchHelper from '../helpers/fetchHelper';
import { requestMethod, headerContentType } from '../constants/common/requestProperties';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import { API_ACCOUNT } from './api/apiActions';
import IRetourAppelDTO from './interfaces/retourAppelDTO';

export const accountService = {
  createAccount,
  getResetPasswordTokenWithEmail,
  getResetPasswordTokenWithCustomerNumber,
  resetPassword,
  apiGetCustomerByIdAsync
}

function createAccount(customerInfo: CustomerInfoModel): Promise<CustomerInfoModel | ErrorObject> {
  const customer: CustomerPersoInfo = CustomerPersoInfo.convertCustomerForBack(customerInfo)
  return fetchHelper(API_ACCOUNT.CREATE_ACCOUNT, true, requestMethod.POST, headerContentType.JSON, JSON.stringify(customer))
    .then(promiseHelpersAction.checkStatus)
    .then((response: Response) => {
      const retourApi: Promise<IRetourAppelCreationClientDTO> = promiseHelpersAction.handleResponse(response);
      return retourApi.then<CustomerInfoModel>((result: IRetourAppelCreationClientDTO) => {
        if (result.erreur) {
          throw new ErrorObject(result.ErreurDTO.CodeErreur, result.ErreurDTO.LibelleErreur, result.ErreurDTO.LibelleErreur);
        } else {
          return CustomerInfoModel.MergeResulstCreate(customerInfo, result);
        }
      })
    })
}

/**
 * Fait une demande de réinitialisation de mot de passe.
 * @param email Adresse email du client.
 * @returns {Promise<ForgotPasswordModel>} Promesse avec le modèle contenant les informations de la réponse fournie par l'API.
 */
function getResetPasswordTokenWithEmail(email: string): Promise<ForgotPasswordModel> {
  return fetchHelper(API_ACCOUNT.RESET_PASSWORD_GETTOKEN_BYEMAIL + email, true, requestMethod.POST, headerContentType.JSON)
    .then(promiseHelpersAction.checkStatus)
    .then((response: Response) => {
      const apiReturn: Promise<IRetourAppelCreationJetonReinitialisationMdp> = promiseHelpersAction.handleResponse(response);

      return apiReturn
        .then((result: IRetourAppelCreationJetonReinitialisationMdp) => {
          if (result.erreur) {
            throw new ErrorObject(result.ErreurDTO.CodeErreur, result.ErreurDTO.LibelleErreur, 'Sorry, an error occurred');
          } else {
            return ForgotPasswordModel.Map('IRetourAppelCreationJetonReinitialisationMdp', result);
          }
        })
    });
}

/**
 * Fait une demande de réinitialisation de mot de passe.
 * @param customerNumber Numéro du client.
 * @returns {Promise<ForgotPasswordModel>} Promesse avec le modèle contenant les informations de la réponse fournie par l'API.
 */
function getResetPasswordTokenWithCustomerNumber(customerNumber: string): Promise<ForgotPasswordModel> {
  return fetchHelper(API_ACCOUNT.RESET_PASSWORD_GETTOKEN_BYID + customerNumber, true, requestMethod.POST, headerContentType.JSON)
    .then(promiseHelpersAction.checkStatus)
    .then((response: Response) => {
      const apiReturn: Promise<IRetourAppelCreationJetonReinitialisationMdp> = promiseHelpersAction.handleResponse(response);

      return apiReturn
        .then((result: IRetourAppelCreationJetonReinitialisationMdp) => {
          if (result.erreur) {
            throw new ErrorObject(result.ErreurDTO.CodeErreur, result.ErreurDTO.LibelleErreur, 'Sorry, an error occurred');
          } else {
            return ForgotPasswordModel.Map('IRetourAppelCreationJetonReinitialisationMdp', result);
          }
        })
    });
}

/**
 * Réinitialiser le mot de passe d'un client.
 * @param token Token permettant d'identifier la demande de réinitialisation de mot de passe.
 * @param password Mot de passe du client.
 * @param passwordConfirmation Confirmation du mot de passe du client.
 * @returns {Promise<IRetourAppelDTO>} Promesse avec le modèle contenant les informations de la réponse fournie par l'API.
 */
function resetPassword(token: string, password: string, passwordConfirmation: string) {
  const bodyPayload: string = JSON.stringify({ 'Token': token, 'Password': password, 'PasswordConfirmation': passwordConfirmation });
  return fetchHelper(API_ACCOUNT.RESET_PASSWORD, true, requestMethod.POST, headerContentType.JSON, bodyPayload)
    .then(promiseHelpersAction.checkStatus)
    .then((response: Response) => {
      const apiReturn: Promise<IRetourAppelCreationJetonReinitialisationMdp> = promiseHelpersAction.handleResponse(response);

      return apiReturn
        .then((result: IRetourAppelDTO) => {
          if (result.erreur) {
            throw new ErrorObject(result.ErreurDTO.CodeErreur, result.ErreurDTO.LibelleErreur, 'Sorry, an error occurred');
          } else {
            return result;
          }
        })
    });
}

function apiGetCustomerByIdAsync(): Promise<CustomerInfoModel> {
  return fetchHelper(API_ACCOUNT.GET_CUSTOMER, false, requestMethod.GET, headerContentType.JSON)
    .then(promiseHelpersAction.checkStatus)
    .then((res: Response) => {
      const apiResult: Promise<ICustomerData> = promiseHelpersAction.handleResponse(res)
      return apiResult
        .then((apiModel: ICustomerData) => {
          if (apiModel.erreur) {
            throw new ErrorObject(0, 'No customer Data', 'No customer Data');
          } else {
            return CustomerInfoModel.Map('ICustomerData', apiModel);
          }
        });
    });
}
