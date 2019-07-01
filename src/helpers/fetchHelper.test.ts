import fetchHelper from './fetchHelper';
import { requestMethod, headerContentType } from '../constants/common/requestProperties';
import { API_ACCOUNT } from '../services/api/apiActions';

const apiUrl: string = 'http://localhost:5702';

const reqMethod: requestMethod = requestMethod.GET;
const content: headerContentType = headerContentType.JSON;

test('fetchHelper', async () => {
    const retHelper: Promise<Response> = fetchHelper(API_ACCOUNT.GET_CUSTOMER, false, reqMethod, content);
    const retHelper2: Promise<Response> = fetchHelper(API_ACCOUNT.CREATE_ACCOUNT, false);
    const retHelper3: Promise<Response> = fetchHelper(API_ACCOUNT.GET_CUSTOMER);

    let header: HeadersInit = {
        'Content-Type': content ? content : headerContentType.JSON
    }
    const authHeader: HeadersInit = {
        'authorization': 'Bearer accessToken'
    };
    header = { ...header, ...authHeader };

    const reqInit = {
        method: requestMethod.GET,
        headers: header,
        body: undefined
    }

    expect(retHelper3).toEqual(fetch(apiUrl + API_ACCOUNT.GET_CUSTOMER, reqInit));
    reqInit.headers = header;
    expect(retHelper).toEqual(fetch(apiUrl + API_ACCOUNT.GET_CUSTOMER, reqInit));
    expect(retHelper2).toEqual(fetch(apiUrl + API_ACCOUNT.CREATE_ACCOUNT, reqInit));
})