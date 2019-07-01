import ErrorObject from '../constants/common/errorObject';
import { History } from 'history';
import * as types from './types/errorTypes';
import IAction from '../constants/common/IAction';
import { Dispatch } from 'redux';
import { ErrorReturn } from '../constants/common/typeFactory';

export const errorActions = {
    handleHTTPError,
    error400
}

function handleHTTPError(error: ErrorObject, history: History): ErrorReturn {
    return (dispatch: Dispatch<IAction<types.IErrorActionsTypes>>): void => {
        if (error.status >= 400 && error.status <= 599) {
            dispatch(error400(history))
        }
    }
}
function error400(propsHistory: History): IAction<types.HTTP_400_ERROR> {
    return {
        type: types.HTTP_400_ERROR,
        payload: {
            history: propsHistory
        }
    }
}
