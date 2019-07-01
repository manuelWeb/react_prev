import * as types from './types/alertTypes';
import { alertActions } from './alertActions';
import IAction from '../constants/common/IAction';
import thunk, { ThunkDispatch } from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { IAppState } from '../constants/AppInterfaces';

type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;

const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

describe('Alert actions', () => {
    const expectedSuccessAction: IAction<types.ALERT_SUCCESS> = {
        type: types.ALERT_SUCCESS,
        payload: {
            message: 'success',
            className: 'alert--success'
        }
    };

    describe('action creator ALERT_SUCCESS', () => {
        it('should create an action ALERT_SUCCESS', () => {
            const actualAction: IAction<types.ALERT_SUCCESS> = alertActions.success('success');
            expect(actualAction).toEqual(expectedSuccessAction);
        });
    });

    const expectedClearAction: IAction<types.ALERT_CLEAR> = {
        type: types.ALERT_CLEAR,
        payload: {}
    };

    describe('action creator ALERT_CLEAR', () => {
        it('should create an action ALERT_CLEAR', () => {
            const actualAction: IAction<types.ALERT_CLEAR> = alertActions.clear();
            expect(actualAction).toEqual(expectedClearAction);
        });
    });

    describe('action creator ALERT_ERROR', () => {
        it('creates ALERT_ERROR', () => {
            const expectedErrorAction: IAction<types.ALERT_ERROR> = {
                type: types.ALERT_ERROR,
                payload: {
                    message: 'error',
                    className: 'alert--danger'
                }
            };

            const store = mockStore(undefined);
            store.dispatch(alertActions.error('error'));
            const actionsStore = store.getActions();
            expect(actionsStore[0]).toEqual(expectedErrorAction)
        })
    })

});

