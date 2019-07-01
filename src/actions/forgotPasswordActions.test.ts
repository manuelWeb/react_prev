import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import * as actions from '../actions/forgotPasswordActions';
import * as types from '../actions/types/forgotPasswordTypes';
import { accountService } from '../services/accountService';
import loginService from '../services/authenticationService';
import IAction from '../constants/common/IAction';
import { IAppState } from '../constants/AppInterfaces';

type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;

const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

describe('Forgot password actions', () => {
  beforeAll(() => {
    jest.spyOn(loginService, 'apiLoginAsync').mockImplementation(() => Promise.resolve({}));
  });

  describe('Action creators', () => {
    it('should create an action to send a forgot password request', () => {
      const expectedAction: IAction<null> = {
        type: types.FORGOT_PASSWORD_REQUEST,
        payload: null
      };

      const actualAction: IAction<null> = actions.sendRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action if request is successfull', () => {
      const isRequestSuccessfull: boolean = true;
      const expectedAction: IAction<boolean> = {
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: isRequestSuccessfull
      };

      const actualAction: IAction<boolean> = actions.sendRequestResult(types.FORGOT_PASSWORD_SUCCESS, isRequestSuccessfull);

      expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action if request has failed', () => {
      const isRequestSuccessfull: boolean = false;
      const expectedAction: IAction<boolean> = {
        type: types.FORGOT_PASSWORD_FAILURE,
        payload: isRequestSuccessfull
      };

      const actualAction: IAction<boolean> = actions.sendRequestResult(types.FORGOT_PASSWORD_FAILURE, isRequestSuccessfull);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('Action implementations', () => {
    it('creates FORGOT_PASSWORD_SUCCESS when api call is successfull with no error', () => {
      jest.spyOn(accountService, 'getResetPasswordTokenWithEmail').mockImplementationOnce(() => Promise.resolve({
        isError: false
      }));

      const email: string = 'test@test.fr';

      const expectedActions = [{
          type: types.FORGOT_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.FORGOT_PASSWORD_SUCCESS,
          payload: true
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.requestToken(email)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates FORGOT_PASSWORD_SUCCESS when api call is successfull but returned an error', () => {
      jest.spyOn(accountService, 'getResetPasswordTokenWithEmail').mockImplementationOnce(() => Promise.resolve({
        isError: true
      }));

      const email: string = 'test@test.fr';

      const expectedActions = [{
          type: types.FORGOT_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.FORGOT_PASSWORD_SUCCESS,
          payload: false
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.requestToken(email)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates FORGOT_PASSWORD_FAILURE when api call is not successfull', () => {
      jest.spyOn(accountService, 'getResetPasswordTokenWithEmail').mockImplementationOnce(() => Promise.reject());

      const email: string = 'test@test.fr';

      const expectedActions = [{
          type: types.FORGOT_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.FORGOT_PASSWORD_FAILURE,
          payload: false
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.requestToken(email)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });
});