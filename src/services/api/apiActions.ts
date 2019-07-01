/*
* Method: POST
* Content_type: application/x-www-form-urlencoded
*/
const TOKEN = '/token';
/* const CLIENT_CREDENTIALS: string = 'client_credentials';
const PASSWORD: string = 'password';
const REFRESH_TOKEN: string = 'refresh_token'; */
enum GRANT_TYPE {
    CLIENT_CREDENTIALS = 'client_credentials',
    PASSWORD = 'password',
    REFRESH_TOKEN = 'refresh_token'
}
export const API_AUTH = {
    TOKEN,
    GRANT_TYPE
}

const CREATE_ACCOUNT = '/api/Client/WebCreationClient';
const RESET_PASSWORD = '/api/Client/WebReinitialiserMotDePasse';
const RESET_PASSWORD_GETTOKEN_BYEMAIL = '/api/Client/CreerTokenReinitialisationMdpByEmail?emailClient=';
const RESET_PASSWORD_GETTOKEN_BYID = '/api/Client/CreerTokenReinitialisationMdpById?numeroClient=';
const GET_CUSTOMER = '/api/Client/IdentificationClientFromId';

export const API_ACCOUNT = {
    CREATE_ACCOUNT,
    RESET_PASSWORD,
    RESET_PASSWORD_GETTOKEN_BYEMAIL,
    RESET_PASSWORD_GETTOKEN_BYID,
    GET_CUSTOMER
}