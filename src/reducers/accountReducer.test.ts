import accountReducer from './accountReducer';
import * as types from '../actions/types/accountTypes';
import { IAccountState } from '../constants/account/IAccount';
import ErrorObject from '../constants/common/errorObject';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import IAction from '../constants/common/IAction';

describe('Error login reducer', () => {

    const initialState: IAccountState<CustomerInfoModel> = {
        account: {} as CustomerInfoModel,
        error: {} as ErrorObject[]
    }
    const createSuccessState: IAccountState<CustomerInfoModel> = {
        account: {} as CustomerInfoModel,
        error: {} as ErrorObject[]
    }
    const getDataSuccessState: IAccountState<CustomerInfoModel> = {
        account: {} as CustomerInfoModel,
        error: {} as ErrorObject[]
    }
    const createFailedState: IAccountState<CustomerInfoModel> = {
        account: {} as CustomerInfoModel,
        error: {} as ErrorObject[]
    }

    it('should return the initial state', () => {
        const errorAction: IAction<types.IAccountActionType> = {
            type: 'NO_ACTION',
            payload: { account: {} as CustomerInfoModel }
        }
        expect(accountReducer(initialState, errorAction)).toEqual(initialState);
        expect(accountReducer(undefined, errorAction).error).toBeTruthy();
    })

    it('should handler CREATE_ACCOUNT_REQUEST action', () => {

        const requestAction: IAction<types.CREATE_ACCOUNT_REQUEST> = {
            type: types.CREATE_ACCOUNT_REQUEST,
            payload: {
                account: {} as CustomerInfoModel
            }
        }
        expect(accountReducer(initialState, requestAction)).toEqual(createSuccessState);
        expect(accountReducer(undefined, requestAction).error).toEqual({});

    })

    it('should handler CREATE_ACCOUNT_SUCCESS action', () => {

        const successCreateAction: IAction<types.CREATE_ACCOUNT_SUCCESS> = {
            type: types.CREATE_ACCOUNT_SUCCESS,
            payload: {
                account: {} as CustomerInfoModel
            }
        }

        expect(accountReducer(initialState, successCreateAction)).toEqual(createSuccessState);
    })

    it('should handler GET_ACCOUNT_DATA_SUCCESS action', () => {

        const GetDataSuccessAction: IAction<types.GET_ACCOUNT_DATA_SUCCESS> = {
            type: types.GET_ACCOUNT_DATA_SUCCESS,
            payload: { accountData: {} as CustomerInfoModel }
        }
        expect(accountReducer(initialState, GetDataSuccessAction)).toEqual(getDataSuccessState)
    })
})