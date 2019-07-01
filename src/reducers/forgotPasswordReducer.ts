import { IForgotPasswordState } from '../constants/ForgotPasswordInterfaces';
import * as actionsTypes from '../actions/types/forgotPasswordTypes';
import IAction from '../constants/common/IAction';

const initialState: IForgotPasswordState = {
  isPending: false,
  isRequestSuccessfull: false
};

export function forgotPasswordReducer(state: IForgotPasswordState = initialState, action: IAction<string | boolean | null>): IForgotPasswordState {
  switch (action.type) {

    case actionsTypes.FORGOT_PASSWORD_REQUEST: {
      const newState: IForgotPasswordState = {
        isPending: true,
        isRequestSuccessfull: false
      };

      return Object.assign({}, state, newState);
    }

    case actionsTypes.FORGOT_PASSWORD_SUCCESS: {
      const newState: IForgotPasswordState = {
        isPending: false,
        isRequestSuccessfull: action.payload as boolean
      };

      return Object.assign({}, state, newState);
    }

    case actionsTypes.FORGOT_PASSWORD_FAILURE: {
      const newState: IForgotPasswordState = {
        isPending: false,
        isRequestSuccessfull: false
      };

      return Object.assign({}, state, newState);
    }

    default: {
      return state;
    }
  }
}