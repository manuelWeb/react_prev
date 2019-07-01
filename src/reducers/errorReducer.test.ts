import errorReducer from "./errorReducer";
import { IErrorState } from "../constants/error/IErrorState";
import ErrorObject from "../constants/common/errorObject";
import { History, createBrowserHistory } from "history";
import * as types from '../actions/types/errorTypes';
import IAction from '../constants/common/IAction';

describe('Error reducer', () => {
    it('should return the initial state', () => {
        const errorState: IErrorState = {
            error: {} as ErrorObject,
            history: {} as History
        }

        const errorAction: IAction<types.IErrorActionsTypes> = {
            type: 'NO_ACTION',
            payload: {
                error: {} as ErrorObject,
                history: {} as History
            }
        }
        expect(errorReducer(undefined, errorAction)).toEqual(errorState)
    })

    it('should handler HTTP_400_ERROR action', () => {
        const history: History = createBrowserHistory()

        const errorState: IErrorState = {
            error: {} as ErrorObject,
            history: history
        }

        const errorAction: IAction<types.IErrorActionsTypes> = {
            type: types.HTTP_400_ERROR,
            payload: {
                history: history
            }
        }
        expect(errorReducer(undefined, errorAction)).toEqual(errorState)
    })

    it('should handler HTTP_500_ERROR action', () => {
        const history: History = createBrowserHistory()

        const errorState: IErrorState = {
            error: {} as ErrorObject,
            history: history
        }

        const errorAction: IAction<types.IErrorActionsTypes> = {
            type: types.HTTP_500_ERROR,
            payload: {
                history: history
            }
        }
        expect(errorReducer(undefined, errorAction)).toEqual(errorState)
    })

    it('should handler HTTP_Other_ERROR action', () => {
        const errorState: IErrorState = {
            error: new ErrorObject(500),
            history: {} as History
        }

        const errorAction: IAction<types.IErrorActionsTypes> = {
            type: types.HTTP_OTHER_ERROR,
            payload: {
                error: new ErrorObject(500),
            }
        }
        expect(errorReducer(undefined, errorAction)).toEqual(errorState)
    })
})