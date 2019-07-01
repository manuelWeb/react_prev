import * as types from '../actions/types/alertTypes';
import IAction from '../constants/common/IAction';
import IAlertState from './../constants/alert/alertInterfaces';

const initialState: IAlertState = {
  type: types.ALERT_CLEAR
}

export default function alert(state: IAlertState = initialState, action: IAction<types.AleltEnum>): IAlertState {
  switch (action.type) {
    case types.ALERT_SUCCESS:
      return {
        type: types.ALERT_SUCCESS,
        message: (action.payload as types.ALERT_SUCCESS).message,
        className: (action.payload as types.ALERT_SUCCESS).className
      };
    case types.ALERT_ERROR:
      return {
        type: types.ALERT_ERROR,
        message: (action.payload as types.ALERT_ERROR).message,
        className: (action.payload as types.ALERT_ERROR).className
      };
    case types.ALERT_CLEAR:
      return {
        type: types.ALERT_CLEAR
      };
    default:
      return state
  }
}