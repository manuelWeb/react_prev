import * as types from './types/errorTypes';
import { createBrowserHistory} from 'history'
import IAction from '../constants/common/IAction';
import * as actions from '../actions/errorHandlerActions';
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { IAppState } from '../constants/AppInterfaces';
import ErrorObject from '../constants/common/errorObject';

type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;

const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

describe('Error actions', () => {
    const propsHistory = createBrowserHistory();
    const expectedAction400: IAction<types.HTTP_400_ERROR> = {
        type: types.HTTP_400_ERROR,
        payload: { history: propsHistory }
    };

    describe('action creator', () => {
        it('should create an action to redirect after error 400', () => {
            const actualAction: IAction<types.HTTP_400_ERROR> = actions.errorActions.error400(propsHistory)
            expect(actualAction).toEqual(expectedAction400);
        });
    });

    describe('creates HTTP_ERROR_400', () => {
        it('creates HTTP_400_ERROR', () => {
            const errorObj: ErrorObject = new ErrorObject(400);
            const expectedAction400: IAction<types.HTTP_400_ERROR> = {
                type: types.HTTP_400_ERROR,
                payload: { history: propsHistory }
            };

            const store = mockStore(undefined);
            store.dispatch(actions.errorActions.handleHTTPError(errorObj, propsHistory));
            const actionsStore = store.getActions();
            expect(actionsStore[0]).toEqual(expectedAction400)
        })
    })

});
