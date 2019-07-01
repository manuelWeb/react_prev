import * as queryString from 'querystring'
import { promiseHelpersAction } from '../helpers/promiseHelper'
import {
  TokenDataModel,
  ILoginCredentialsModel,
} from '../models/authenticationModels'
import { ITokenData } from './interfaces/authentication'
import * as HttpStatus from '../helpers/httpStatusHelper'
import { reasonFailEnum } from '../constants/authentication/authenticationConstants'
import { decodeJwt } from '../helpers/accessTokenHeader'
import { API_AUTH } from './api/apiActions'

const apiUrl: string = 'http://localhost:5702'

const loginService = {
  apiLoginAsync,
}
export default loginService

interface tokenParam {
  grant_type: string
  client_id: string
  client_secret: string
  username?: string
  password?: string
  refresh_token?: string
}
function setRequestInit(
  input?: ILoginCredentialsModel,
  grantType: string = API_AUTH.GRANT_TYPE.CLIENT_CREDENTIALS,
  refreshToken: string = ''
): RequestInit {
  let payload: tokenParam = {
    grant_type: grantType,
    client_id: 'MvcBecquet',
    client_secret: 'Becquet2017',
  }
  if (refreshToken) {
    payload = { ...payload, refresh_token: refreshToken }
  }
  if (input && input !== undefined) {
    payload = { ...payload, username: input.email, password: input.password }
  }
  const request: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString.stringify(payload),
  }

  const token = decodeJwt()
  if (refreshToken && token) {
    request.headers = {
      ...request.headers,
      authorization: `Bearer ${token.AccessToken}`,
    }
  }
  return request
}

function apiLoginAsync(
  input?: ILoginCredentialsModel,
  grantType: string = API_AUTH.GRANT_TYPE.CLIENT_CREDENTIALS,
  refreshToken: string = ''
): Promise<TokenDataModel> {
  // Get user API's token
  return fetch(
    apiUrl + API_AUTH.TOKEN,
    setRequestInit(input, grantType, refreshToken)
  )
    .then(promiseHelpersAction.checkStatus)
    .then((response: Response) => {
      const retourApi: Promise<
        ITokenData
      > = promiseHelpersAction.handleResponse(response)
      return retourApi.then<TokenDataModel>((result: ITokenData) => {
        const tokenData: TokenDataModel = TokenDataModel.Map(
          'ITokenData',
          result
        )
        localStorage.setItem('AccessToken', JSON.stringify(tokenData))
        sessionStorage.removeItem('CustomerData')
        return tokenData
      })
    })
  /* .catch(reason => {
        Promise.reject(getReasonFail(reason));
        return {} as TokenDataModel;
    }) */
}

export function getReasonFail(errorResponse: Response): reasonFailEnum {
  let error: reasonFailEnum = {} as reasonFailEnum
  if (errorResponse.json) {
    errorResponse.json().then(res => {
      const apiError = res
      if (errorResponse.status === HttpStatus.STATUS_FORBIDDEN) {
        error = reasonFailEnum.MauvaisMotPasse
      } else {
        switch (apiError.ErrorDescription) {
          case HttpStatus.STATUS_NOT_FOUND:
            error = reasonFailEnum.CompteInexistant
            break
          case HttpStatus.STATUS_AMBIGUOUS:
            error = reasonFailEnum.Ambigue
            break
          case HttpStatus.STATUS_ERROR_SERVER:
            error = reasonFailEnum.ErreurServeur
            break
          default:
            error = reasonFailEnum.Unknown
        }
      }
    })
  }
  return error
}
