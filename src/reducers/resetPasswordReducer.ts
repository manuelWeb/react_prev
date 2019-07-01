import { IResetPasswordState } from '../constants/ForgotPasswordInterfaces';
import * as actionsTypes from '../actions/types/resetPasswordTypes';
import IAction from '../constants/common/IAction';

const initialState: IResetPasswordState = {
  isPending: false,
  isRequestSuccessfull: false
};

export function resetPasswordReducer(state: IResetPasswordState = initialState, action: IAction<string | boolean | null>): IResetPasswordState {
  switch (action.type) {

    case actionsTypes.RESET_PASSWORD_REQUEST: {
      const newState: IResetPasswordState = {
        isPending: true,
        isRequestSuccessfull: false
      };

      return Object.assign({}, state, newState);
    }

    case actionsTypes.RESET_PASSWORD_SUCCESS: {
      const newState: IResetPasswordState = {
        isPending: false,
        isRequestSuccessfull: action.payload as boolean
      };

      return Object.assign({}, state, newState);
    }

    case actionsTypes.RESET_PASSWORD_FAILURE: {
      const newState: IResetPasswordState = {
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