import { Action } from 'redux';

/**
 * Interface représentant une action de base.
 */
export default interface IAction<T> extends Action<string> {
  payload: T;
}