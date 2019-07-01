import { IAccountState } from '../constants/account/IAccount';
import * as types from '../actions/types/accountTypes';
import IAction from '../constants/common/IAction';
import ErrorObject from '../constants/common/errorObject';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';

const initialState: IAccountState<CustomerInfoModel> = {
  account: {} as CustomerInfoModel,
  error: {} as ErrorObject[]
}

export default function accountReducer(state: IAccountState<CustomerInfoModel> = initialState, action: IAction<types.IAccountActionType>): IAccountState<CustomerInfoModel> {
  switch (action.type) {
    case types.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        account: (action.payload as types.CREATE_ACCOUNT_REQUEST).account
      }
    case types.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: (action.payload as types.CREATE_ACCOUNT_SUCCESS).account
      }
    case types.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        error: (action.payload as types.CREATE_ACCOUNT_FAILURE).error
      }
    case types.GET_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        account: (action.payload as types.GET_ACCOUNT_DATA_SUCCESS).accountData
      }
    default:
      return state;
  }
}