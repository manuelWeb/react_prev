import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from './types/alertTypes';
import IAction from './../constants/common/IAction';

export const alertActions = {
    success,
    error,
    clear
};

function success(successMessage: string): IAction<ALERT_SUCCESS> {
    return {
        type: ALERT_SUCCESS,
        payload: {
            message: successMessage,
            className: 'alert--success'
        }
    }
}

function error(errorMessage: string): IAction<ALERT_ERROR> {
    return {
        type: ALERT_ERROR,
        payload: {
            message: errorMessage,
            className: 'alert--danger'
        }
    }
}

function clear(): IAction<ALERT_CLEAR> {
    return {
        type: ALERT_CLEAR,
        payload: {}
    }
}