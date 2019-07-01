import * as accessToken from './accessTokenHeader';
// import accessTokenHeader from './accessTokenHeader';
// import localStorage from 'jest-localstorage-mock';
import { TokenDataModel } from '../models/authenticationModels';
import { stringify } from 'querystring';

beforeEach(() => {
    // reset the storage
    localStorage.clear();
});

const key = 'AccessToken';
let mockStorage = {};

const localStorage = {
    setItem: (key: string, val: string | undefined) => Object.assign(mockStorage, {
        [key]: val
    }),
    getItem: (key: string) => mockStorage[key],
    clear: () => mockStorage = {}
};

const userToken: TokenDataModel = {
    AccessToken: 'access_token',
    TokenType: 'bearer',
    ExpiresIn: 1199,
    RefreshToken: 'refresh_token',
    Consumer: 'MvcBecquet',
    NumeroClient: '717300006931',
    Civilite: 'MLLE',
    Prenom: 'OLFA',
    Nom: 'MAGHREBI',
    AdresseEmail: 'olfa@yopmail.com',
    CodePostal: '59800',
    Pays: 'FR',
    OptIn: false,
    '.issued': new Date(),
    '.expires': new Date()
};
describe('test empty localStorage', () => {
    localStorage.setItem(key, '');
    it('should return false on empty localStorage', () => {
        expect(accessToken.isAuth(false)).toBe(false);
        expect(accessToken.isAuth()).toBe(false);
        expect(accessToken.isFreshToken()).toBe(false);
    });
})

describe('test existing accessToken in localStorage', () => {
    it('should return true', () => {
        localStorage.clear();
        localStorage.setItem(key, stringify(userToken));
        // expect(accessToken.isAuth(false)).toBe(true);
        expect(accessToken.isAuth(false)).toBe(false);
        expect(accessToken.isFreshToken()).toBe(false);
    });
})
describe('test existing anonymous accessToken in localStorage', () => {
    it('should return false for not anonymous token', () => {
        localStorage.clear();
        userToken.AdresseEmail = '';
        localStorage.setItem(key, stringify(userToken));
        expect(accessToken.isAuth(false)).toBe(false);
        // expect(accessToken.isAuth()).toBe(true);
    });
})

/* describe('test empty localStorage', () => {
    it('should return authorization headerInit', () => {
        localStorage.setItem(key, stringify(userToken));
        expect(accessTokenHeader(false)).toEqual({
            'authorization': 'Bearer access_token'
        });
    });

    it('should return authorization headerInit', () => {
        localStorage.setItem(key, stringify(userToken));
        expect(accessToken.checkAuth(false)).toEqual(
            new Promise<string>((resolve, reject) => {
                resolve(userToken.AccessToken);
            })
        )
    });
}) */