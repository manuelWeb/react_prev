
export interface IAccountState<T> {
   readonly account: T,
   readonly error?: Error
}