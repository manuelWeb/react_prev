import loginService, { reasonFailEnum } from './authenticationService';
import { LoginCredentialsModel, TokenDataModel } from '../models/authenticationModels';


describe('Authentication Tests', () => {
    let grantType: string = 'client_credentials';
    describe('Test invoke user token error', () => {
        it('Call return error 404', () => {
            const fetchSpy = jest.spyOn(loginService, 'apiLoginAsync')
                .mockImplementation(() => Promise.reject({
                    status: 404
                }).catch(() => {
                    let error: reasonFailEnum;
                    error = reasonFailEnum.Unknown
                    Promise.reject(error);
                }
                ));
            grantType = 'password';
            loginService.apiLoginAsync({} as LoginCredentialsModel, grantType);
            expect(fetchSpy).toHaveBeenCalledWith({} as LoginCredentialsModel, grantType);
        })
    });

    describe('Test invoke user token success', () => {
        it('Call return response 200', () => {
            const fetchSpy = jest.spyOn(loginService, 'apiLoginAsync')
                .mockImplementation(() => Promise.resolve({
                    token: TokenDataModel
                }));
            grantType = 'password';
            loginService.apiLoginAsync({} as LoginCredentialsModel, grantType);
            expect(fetchSpy).toHaveBeenCalledWith({} as LoginCredentialsModel, grantType) as () => Promise<TokenDataModel>;
        })
    })

    describe('Test invoke anonymous token success', () => {
        it('Call return response 200', () => {
            const fetchSpy = jest.spyOn(loginService, 'apiLoginAsync')
                .mockImplementation(() => Promise.resolve({
                    token: TokenDataModel
                }));
            loginService.apiLoginAsync({} as LoginCredentialsModel, grantType);
            expect(fetchSpy).toHaveBeenCalledWith({} as LoginCredentialsModel, grantType) as () => Promise<TokenDataModel>;
        })
    })
});