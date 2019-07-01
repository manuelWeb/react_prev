import { IErrorState } from '../constants/error/IErrorState';
import ErrorObject from '../constants/common/errorObject';
import { History } from 'history';
import IAction from '../constants/common/IAction';
import * as types from '../actions/types/errorTypes';

const initialState: IErrorState = {
    error: {} as ErrorObject,
    history: {} as History
}

export default function errorReducer(state: IErrorState = initialState, action: IAction<types.IErrorActionsTypes>): IErrorState {
    switch (action.type) {
        case types.HTTP_400_ERROR: {
            (action.payload as types.HTTP_400_ERROR).history.push('/400')
            return {
                ...state,
                history: (action.payload as types.HTTP_400_ERROR).history
            }
        }
        case types.HTTP_500_ERROR: {
            (action.payload as types.HTTP_500_ERROR).history.push('/500')
            return {
                ...state,
                history: (action.payload as types.HTTP_500_ERROR).history
            }
        }
        case types.HTTP_OTHER_ERROR: {
            return {
                ...state,
                error: (action.payload as types.HTTP_OTHER_ERROR).error
            }
        }
        default:
            return state
    }
}