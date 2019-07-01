import * as actionsAccount from '../actions/accountActions'
import * as typesAccount from './types/accountTypes';
import * as typesAlert from './types/alertTypes';
import * as typesError from './types/errorTypes';
import IAction from '../constants/common/IAction';
import { accountService } from '../services/accountService';
import { createBrowserHistory } from 'history';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import { IAppState } from '../constants/AppInterfaces';
import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

type DispatchExts = ThunkDispatch<IAppState, void, IAction<any>>;

const middlewares = [thunk]
const mockStore = configureMockStore<IAppState, DispatchExts>(middlewares)

describe('Account actions', () => {

    const historyProps = createBrowserHistory();
    const customerEmpty: CustomerInfoModel = {} as CustomerInfoModel;

    const customer: CustomerInfoModel = {

        Civility: 'Mme',
        Firstname: 'TEST',
        Name: 'TEST',
        AdressCustomer: {
            AdditionalAdress: '',
            City: 'CROIX',
            LabelTrack: 'JULES GUESDE',
            Location: 'CROIX',
            PostalCode: '59170',
            TrackNumber: '85',
            TrackNumeroSupplement: '',
            TypeShortTrack: '',
            TypeTrack: 'Rue'
        },
        Phone: '0615151515',
        Cellphone: '0615151515',
        EmailAdress: 'testg@test.fr',
        BirthDate: '03/04/1989',
        Email: '',
        SubcriptionCustomer: {
            OptIn: true,
            OptInPartner: false,
            OptInSms: false,
            ContactId: 0,
            DateRegistrationSms: '',
            DateRegistrationSmsPartner: '',
            DateSubscriptionPartner: '',
            DateUnsubscribePartner: '',
            DateUnsubscribeSms: '',
            DateUnsubscribeSmsPartner: '',
            OptInSmsPartenaire: false,
            PartnerRejectionType: '',
            RejectionType: '',
            SmsRejectionType: '',
            SubcriptionDate: '',
            SubscriptionId: 0,
            TypeRejectionPartnerSms: '',
            UnsubscribeDate: ''
        },
        ConnexionClient: {
            Password: '123123',
            Email: '',
            Catalog: '',
            CustomerId: 0,
            Country: '',
            CustomerNumber: 0,
            Language: '',
            PersonNumber: 0,
            RegistrationNumber: 0,
            Url: ''
        },
        Catalog: '',
        Country: '',
        CreationDateFourStarCardNumber: '',
        DeliveryOffice: 'CROIX',
        FourStarCardNumber: '',
        Language: '',
        NameSupplement: '',
        PossessionFourStarCardNumber: false,
        RegistrationNumber: '',
        Url: '',
    }

    describe('Action creators create account', () => {

        it('should create an action to send an account at create request', () => {
            const expectedAction: IAction<typesAccount.CREATE_ACCOUNT_REQUEST> = {
                type: typesAccount.CREATE_ACCOUNT_REQUEST,
                payload: { account: customerEmpty }
            };
            const actualAction: IAction<typesAccount.CREATE_ACCOUNT_REQUEST> = actionsAccount.accountActions.createAccountRequest(customerEmpty);

            expect(actualAction).toEqual(expectedAction);
        });

        it('should create an action if request is successfull', () => {
            const expectedAction: IAction<typesAccount.GET_ACCOUNT_DATA_SUCCESS> = {
                type: typesAccount.GET_ACCOUNT_DATA_SUCCESS,
                payload: { accountData: customer }
            };

            const actualAction: IAction<typesAccount.GET_ACCOUNT_DATA_SUCCESS> = actionsAccount.accountActions.getCustomerSuccess(customer);

            expect(actualAction).toEqual(expectedAction);
        });
    });

    describe('Action implementations create account', () => {

        it('creates CREATE_ACCOUNT_REQUEST when api call is successfull with error', () => {
            jest.spyOn(accountService, 'createAccount').mockImplementationOnce(() => Promise.resolve());

            const expectedActions = [
                {
                    type: typesAccount.CREATE_ACCOUNT_REQUEST,
                    payload: { account: customerEmpty }
                },
                {
                    type: typesAlert.ALERT_ERROR,
                    payload: {
                        message: 'Bad Request: Bad Request',
                        className: 'alert--danger',
                    }
                },
                {
                    type: typesError.HTTP_400_ERROR,
                    payload: { history: historyProps }
                }];

            const store = mockStore(undefined);

            return store.dispatch(actionsAccount.accountActions.createAccount(customerEmpty, historyProps)).then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
                expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
            })
        });

        // it('creates CREATE_ACCOUNT_REQUEST when api call is successfull with no error', () => {
        //     jest.spyOn(accountService, 'createAccount').mockImplementationOnce(() => Promise.resolve());

        //     const expectedActions = [{
        //         type: typesAccount.CREATE_ACCOUNT_REQUEST,
        //         payload: { account: customer }
        //     }, {
        //         type: typesAuth.LOGIN_TOKEN_SUCCESS,
        //         payload: { user: {} as TokenDataModel }
        //     }];

        //     const store = mockStore(undefined);

        //     return store.dispatch(actionsAccount.accountActions.createAccount(customer, historyProps)).then(() => {
        //         expect(store.getActions()).toEqual(expectedActions)
        //     })
        // });
    });

    describe('Actions implementations to retrieve customer information', () => {
        it('creates GET_ACCOUNT_DATA_SUCCESS when api call is successfull with no error', () => {
            jest.spyOn(accountService, 'apiGetCustomerByIdAsync').mockImplementationOnce(() => Promise.resolve());

            const expectedActions = [
                {
                    type: typesAccount.GET_ACCOUNT_DATA_SUCCESS,
                    payload: { accountData: customer },

                }];

            const store = mockStore(undefined);

            return store.dispatch(actionsAccount.accountActions.getCustomerInfo(historyProps)).then(() => {
                expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
            })
        });

        // it('creates GET_ACCOUNT_DATA_SUCCESS when api call is successfull with error', () => {
        //     jest.spyOn(accountService, 'apiGetCustomerByIdAsync').mockImplementationOnce(() => Promise.reject());

        //     const expectedActions = [
        //         {
        //             type: typesAccount.GET_ACCOUNT_DATA_SUCCESS,
        //             payload: { accountData: {} as CustomerInfoModel },

        //         }, {
        //             type: typesAuth.LOGIN_FAILED,
        //             payload: { error: '' }
        //         }];

        //     const store = mockStore(undefined);

        //     return store.dispatch(actionsAccount.accountActions.getCustomerInfo(historyProps)).catch(() => {
        //         console.log(store.getActions().length)
        //        // expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        //     })
        // });
    });
})
