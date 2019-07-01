import alertReducer from './alertReducer';
import IAlertState from './../constants/alert/alertInterfaces';
import * as types from '../actions/types/alertTypes';
import IAction from '../constants/common/IAction';

describe('Error login reducer', () => {
    const alertInitialState: IAlertState = {
        type: types.ALERT_CLEAR
    }
    const alertSuccessState: IAlertState = {
        type: types.ALERT_SUCCESS,
        message: 'success'
    }
    const alertErrorState: IAlertState = {
        type: types.ALERT_ERROR,
        message: 'error'
    }

    it('should return the initial state', () => {
        const errorAction: IAction<types.AleltEnum> = {
            type: 'NO_ACTION',
            payload: {}
        }
        expect(alertReducer(alertInitialState, errorAction)).toEqual(alertInitialState);
    })

    it('should handler ALERT_SUCCESS action', () => {

        const alertSuccessAction: IAction<types.ALERT_SUCCESS> = {
            type: types.ALERT_SUCCESS,
            payload: {
                message: 'success'
            }
        }
        expect(alertReducer(alertInitialState, alertSuccessAction)).toEqual(alertSuccessState);
        expect(alertReducer(undefined, alertSuccessAction).message).toBeTruthy();
    })

    it('should handler ALERT_ERROR action', () => {

        const alertErrorAction: IAction<types.ALERT_ERROR> = {
            type: types.ALERT_ERROR,
            payload: {
                message: 'error'
            }
        }
        expect(alertReducer(alertInitialState, alertErrorAction)).toEqual(alertErrorState);
        expect(alertReducer(undefined, alertErrorAction).message).toBeTruthy();
    })

    it('should handler ALERT_CLEAR action', () => {

        const alerClearAction: IAction<types.ALERT_CLEAR> = {
            type: types.ALERT_CLEAR,
            payload: {}
        }
        expect(alertReducer(alertInitialState, alerClearAction)).toEqual(alertInitialState);
    })
})