import { IResetPasswordState } from '../constants/ForgotPasswordInterfaces';
import { resetPasswordReducer } from '../reducers/resetPasswordReducer'
import IAction from '../constants/common/IAction';
import * as actionTypes from '../actions/types/resetPasswordTypes';

describe('Reset password reducer', () => {
  it('should return the initial state', () => {
    const state: IResetPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<string> = {
      type: 'NON_EXISTING_ACTION',
      payload: 'test'
    };

    expect(resetPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle RESET_PASSWORD_REQUEST action', () => {
    const state: IResetPasswordState = {
      isPending: true,
      isRequestSuccessfull: false
    };

    const action: IAction<null> = {
      type: actionTypes.RESET_PASSWORD_REQUEST,
      payload: null
    };

    expect(resetPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle RESET_PASSWORD_SUCCESS action if request is successfull with no error', () => {
    const state: IResetPasswordState = {
      isPending: false,
      isRequestSuccessfull: true
    };

    const action: IAction<boolean> = {
      type: actionTypes.RESET_PASSWORD_SUCCESS,
      payload: true
    };

    expect(resetPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle RESET_PASSWORD_SUCCESS action if request is successfull with error', () => {
    const state: IResetPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<boolean> = {
      type: actionTypes.RESET_PASSWORD_SUCCESS,
      payload: false
    };

    expect(resetPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle RESET_PASSWORD_FAILURE action if request has failed', () => {
    const state: IResetPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<boolean> = {
      type: actionTypes.RESET_PASSWORD_FAILURE,
      payload: false
    };

    expect(resetPasswordReducer(undefined, action)).toEqual(state);
  });
});