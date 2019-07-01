import * as types from './types/authenticationTypes';
import * as alertTypes from './types/alertTypes';
import IAction from '../constants/common/IAction';
import * as actions from './authenticationActions';
import * as actionsServices from '../services/authenticationService';
import { TokenDataModel, ILoginCredentialsModel } from '../models/authenticationModels';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../constants/AppInterfaces';
import configureMockStore from 'redux-mock-store';
import history from './../helpers/history';
import localStorage from 'jest-localstorage-mock';
import { alertActions } from './alertActions';
import { API_AUTH } from '../services/api/apiActions';

beforeEach(() => {
    // reset the storage
    localStorage.__STORE__ = {};
});

const userInput: ILoginCredentialsModel = { email: 'olfa@yopmail.com', password: '123123' }
const userToken: TokenDataModel = {
    AccessToken: '',
    TokenType: 'bearer',
    ExpiresIn: 1199,
    RefreshToken: '',
    Consumer: 'MvcBecquet',
    NumeroClient: '717300006931',
    Civilite: 'MLLE',
    Prenom: 'OLFA',
    Nom: 'MAGHREBI',
    AdresseEmail: 'olfa@yopmail.com',
    CodePostal: '59800',
    Pays: 'FR',
    OptIn: false,
    '.issued': new Date(),
    '.expires': new Date()
};

const errorText: string = '';


type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;
const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

const KEY = 'AccessToken';
describe('Authentication actions', () => {

    const expectedActionRequestLogin: IAction<types.LOGIN_REQUEST> = {
        type: types.LOGIN_REQUEST,
        payload: { input: userInput }
    };
    const expectedActionSuccessLogin: IAction<types.LOGIN_TOKEN_SUCCESS> = {
        type: types.LOGIN_TOKEN_SUCCESS,
        payload: { user: userToken }
    };

    const expectedActionFailLogin: IAction<types.LOGIN_FAILED> = {
        type: types.LOGIN_FAILED,
        payload: { error: errorText }
    };

    const expectedActionLogout: IAction<types.LOGOUT> = {
        type: types.LOGOUT,
        payload: {}
    };

    describe('action creator', () => {
        it('should create an action to begin login request', () => {
            const actualAction: IAction<types.LOGIN_REQUEST> = actions.loginRequest(userInput);
            expect(actualAction).toEqual(expectedActionRequestLogin);
        });
    });

    describe('action creator', () => {
        it('should create an action login success', () => {
            const actualAction: IAction<types.LOGIN_TOKEN_SUCCESS> = actions.grantCredentialsSuccess(userToken);
            expect(actualAction).toEqual(expectedActionSuccessLogin);
        });
    });

    describe('action creator', () => {
        it('should create an action login fail', () => {
            const actualAction: IAction<types.LOGIN_FAILED> = actions.loginFailed(errorText)
            expect(actualAction).toEqual(expectedActionFailLogin);
        });
    });

    describe('action creator', () => {
        it('should create an action logout', () => {
            const actualAction: IAction<types.LOGOUT> = actions.logout()
            expect(actualAction).toEqual(expectedActionLogout);
        });
    });
});

describe('Action implementations', () => {
    it('creates LOGIN_TOKEN_SUCCESS when api call is successfull with no error', () => {
        jest.spyOn(actions, 'login').mockImplementationOnce(() => Promise.resolve({
            input: userInput,
        }).then(() => {
            expect(localStorage.__STORE__[KEY]).toBe({} as TokenDataModel);
            sessionStorage.removeItem('CustomerData');
            history.push('/Account');
        }));

        const expectedActions = [{
            type: types.LOGIN_REQUEST,
            payload: { input: userInput }
        }, {
            type: types.LOGIN_TOKEN_SUCCESS,
            payload: {
                user: {
                    CustomerInfoModel,
                    input: userInput
                },
            }
        }
        ];

        const store = mockStore(undefined);
        jest.spyOn(actions, 'login').mockImplementationOnce(() => Promise.resolve()
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                test('should save to localStorage', () => {
                    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, {} as TokenDataModel);
                    expect(localStorage.__STORE__[KEY]).toBe({} as TokenDataModel);
                    expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('CustomerData');
                    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
                });
                expect(store.getActions().find(x => x.type == types.LOGIN_TOKEN_SUCCESS)).toBeCalledTimes(1);
            })
            .catch(() => {
                const expectedActionErrorAlert: IAction<alertTypes.ALERT_ERROR> = {
                    type: alertTypes.ALERT_ERROR,
                    payload: { message: 'error', className: 'alert--danger' }
                };
                const errorAlert = store.dispatch(alertActions.error('error'));
                expect(store.getActions().find(x => x.type == types.LOGIN_FAILED)).toBeCalledTimes(1);
                expect(store.getActions().find(x => x.type == alertTypes.ALERT_ERROR)).toBeCalledTimes(1);
                expect(errorAlert).toEqual(expectedActionErrorAlert);

                // expect(store.getActions()).toBeInstanceOf([{} as IAction<any>, {} as IAction<any>, {} as IAction<any>]);
            })
        )
    })

    it('creates LOGOUT ', () => {
        jest.spyOn(actions, 'logout').mockImplementationOnce(() => {
            const store = mockStore(undefined);
            store.dispatch(actions.default.logout())
            test('should save to localStorage', () => {
                expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, {} as TokenDataModel);
                expect(localStorage.__STORE__[KEY]).toBe({} as TokenDataModel);
                expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('CustomerData');
                expect(Object.keys(localStorage.__STORE__).length).toBe(1);
            });
            expect(actions.logout()).toEqual({
                type: types.LOGOUT,
                payload: {}
            });
        })
    })

    it('Test Refresh token', async () => {
        const refreshToken: string = 'refresh';
        await jest.spyOn(actions, 'getFreshToken').mockImplementationOnce((user) => {
            if (refreshToken) {
                expect(actionsServices.default.apiLoginAsync).toHaveBeenCalledWith(undefined, API_AUTH.GRANT_TYPE.REFRESH_TOKEN, refreshToken);
            }
            else {
                expect(actionsServices.default.apiLoginAsync).toHaveBeenCalledWith();
            }
            if (user) {
                return Promise.resolve(user.AccessToken);
            } else { return ''; }
        })
    })
})