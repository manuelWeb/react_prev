import { History } from 'history';
import ErrorObject from '../../constants/common/errorObject';

// tslint:disable:interface-over-type-literal
export const HTTP_400_ERROR: string = 'HTTP_400_ERROR'
export type HTTP_400_ERROR = {
    history: History
}

export const HTTP_500_ERROR: string = 'HTTP_500_ERROR'
export type HTTP_500_ERROR = {
    history: History
}

export const HTTP_OTHER_ERROR: string = 'HTTP_OTHER_ERROR'
export type HTTP_OTHER_ERROR = {
    error: ErrorObject
}
export type IErrorActionsTypes = HTTP_400_ERROR | HTTP_500_ERROR | HTTP_OTHER_ERROR