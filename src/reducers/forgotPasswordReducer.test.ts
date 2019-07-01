import { IForgotPasswordState } from '../constants/ForgotPasswordInterfaces';
import { forgotPasswordReducer } from '../reducers/forgotPasswordReducer'
import IAction from '../constants/common/IAction';
import * as actionTypes from '../actions/types/forgotPasswordTypes';

describe('Forgot password reducer', () => {
  it('should return the initial state', () => {
    const state: IForgotPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<string> = {
      type: 'NON_EXISTING_ACTION',
      payload: 'test'
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle FORGOT_PASSWORD_REQUEST action', () => {
    const state: IForgotPasswordState = {
      isPending: true,
      isRequestSuccessfull: false
    };

    const action: IAction<string> = {
      type: actionTypes.FORGOT_PASSWORD_REQUEST,
      payload: 'test@test.fr'
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle FORGOT_PASSWORD_SUCCESS action if request is successfull with no error', () => {
    const state: IForgotPasswordState = {
      isPending: false,
      isRequestSuccessfull: true
    };

    const action: IAction<boolean> = {
      type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: true
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle FORGOT_PASSWORD_SUCCESS action if request is successfull with error', () => {
    const state: IForgotPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<boolean> = {
      type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: false
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(state);
  });

  it('should handle FORGOT_PASSWORD_FAILURE action if request has failed', () => {
    const state: IForgotPasswordState = {
      isPending: false,
      isRequestSuccessfull: false
    };

    const action: IAction<boolean> = {
      type: actionTypes.FORGOT_PASSWORD_FAILURE,
      payload: false
    };

    expect(forgotPasswordReducer(undefined, action)).toEqual(state);
  });
});