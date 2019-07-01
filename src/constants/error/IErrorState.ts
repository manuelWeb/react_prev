import ErrorObject from '../common/errorObject';
import { History } from 'history';

export interface IErrorState {
   readonly error: ErrorObject
   readonly history: History
}