import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import * as actions from '../actions/resetPasswordActions';
import * as types from '../actions/types/resetPasswordTypes';
import { accountService } from '../services/accountService';
import loginService from '../services/authenticationService';
import IAction from '../constants/common/IAction';
import { IAppState } from '../constants/AppInterfaces';

type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;

const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

describe('Reset password actions', () => {
  beforeAll(() => {
    jest.spyOn(loginService, 'apiLoginAsync').mockImplementation(() => Promise.resolve({}));
  });

  describe('Action creators', () => {
    it('should create an action to send a reset password request', () => {
      const expectedAction: IAction<null> = {
        type: types.RESET_PASSWORD_REQUEST,
        payload: null
      };

      const actualAction: IAction<null> = actions.sendRequest();

      expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action if request is successfull', () => {
      const isRequestSuccessfull: boolean = true;
      const expectedAction: IAction<boolean> = {
        type: types.RESET_PASSWORD_SUCCESS,
        payload: isRequestSuccessfull
      };

      const actualAction: IAction<boolean> = actions.sendRequestResult(types.RESET_PASSWORD_SUCCESS, isRequestSuccessfull);

      expect(actualAction).toEqual(expectedAction);
    });

    it('should create an action if request has failed', () => {
      const isRequestSuccessfull: boolean = false;
      const expectedAction: IAction<boolean> = {
        type: types.RESET_PASSWORD_FAILURE,
        payload: isRequestSuccessfull
      };

      const actualAction: IAction<boolean> = actions.sendRequestResult(types.RESET_PASSWORD_FAILURE, isRequestSuccessfull);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('Action implementations', () => {
    it('creates RESET_PASSWORD_SUCCESS when api call is successfull with no error', () => {
      jest.spyOn(accountService, 'resetPassword').mockImplementationOnce(() => Promise.resolve({
        isError: false
      }));

      const token: string = 'dec52398-fa71-4ad3-840e-bac1521b6d48';
      const password: string = '123123';

      const expectedActions = [{
          type: types.RESET_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.RESET_PASSWORD_SUCCESS,
          payload: true
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.reinitPassword(token, password, password)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates RESET_PASSWORD_SUCCESS when api call is successfull but returned an error', () => {
      jest.spyOn(accountService, 'resetPassword').mockImplementationOnce(() => Promise.resolve({
        erreur: true
      }));

      const token: string = 'dec52398-fa71-4ad3-840e-bac1521b6d48';
      const password: string = '123123';

      const expectedActions = [{
          type: types.RESET_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.RESET_PASSWORD_SUCCESS,
          payload: false
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.reinitPassword(token, password, password)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates RESET_PASSWORD_FAILURE when api call is not successfull', () => {
      jest.spyOn(accountService, 'resetPassword').mockImplementationOnce(() => Promise.reject());

      const token: string = 'dec52398-fa71-4ad3-840e-bac1521b6d48';
      const password: string = '123123';

      const expectedActions = [{
          type: types.RESET_PASSWORD_REQUEST,
          payload: null
        }, {
          type: types.RESET_PASSWORD_FAILURE,
          payload: false
        }
      ];

      const store = mockStore(undefined);

      return store.dispatch(actions.default.reinitPassword(token, password, password)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });
});