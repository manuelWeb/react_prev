import IAction from '../../constants/common/IAction';
import { Dispatch } from 'redux';
import * as typesErrors from './../../actions/types/errorTypes';

export type AsyncAction<A, S, T> = (dispatch: Dispatch<IAction<A>>, getState: () => S) => T;
export type AsyncVoidPromiseAction<A, S> = AsyncAction<A, S, Promise<void>>;

export type ErrorReturn = (dispatch: Dispatch<IAction<typesErrors.IErrorActionsTypes>>) => void;