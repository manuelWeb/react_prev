import { promiseHelpersAction } from '../helpers/promiseHelper';
import ErrorObject from '../constants/common/errorObject';
const fakeDataPromiseResolve = {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOi',
    token_type: 'bearer',
    expires_in: 1199,
    refresh_token: '28b6c58e-3cbf-40b1-86ed-ba980cbb6446',
    consumer: 'MvcBecquet',
    NumeroClient: '717300006931',
    Civilite: 'MLLE',
    Prenom: 'OLFA',
    Nom: 'MAGHREBI',
    AdresseEmail: 'olfa@yopmail.com',
    CodePostal: '59800',
    Pays: 'FR',
    OptIn: 'False',
}

const fakePromiseOk: Response = {
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'ok',
    headers: {} as Headers,
    trailer: {} as Promise<Headers>,
    type: {} as ResponseType,
    url: 'string',
    body: {} as ReadableStream,
    bodyUsed: false,
    clone: (): Response => {
        return {} as Response
    },
    arrayBuffer: (): Promise<ArrayBuffer> => {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            resolve()
        });
    },
    blob: (): Promise<Blob> => {
        return new Promise<Blob>((resolve, reject) => {
            resolve()
        });
    },
    formData: (): Promise<FormData> => {
        return new Promise<FormData>((resolve, reject) => {
            resolve()
        });
    },
    json: (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            resolve()
        });
    },
    text: (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            resolve()
        });
    },
}

const fakePromiseNotFound: Response = {
    ok: false,
    redirected: false,
    status: 404,
    statusText: 'Not Found',
    headers: {} as Headers,
    trailer: {} as Promise<Headers>,
    type: 'cors',
    url: 'http://localhost:5703/toto',
    body: {} as ReadableStream,
    bodyUsed: false,
    clone: (): Response => {
        return {} as Response
    },
    arrayBuffer: (): Promise<ArrayBuffer> => {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            reject()
        });
    },
    blob: (): Promise<Blob> => {
        return new Promise<Blob>((resolve, reject) => {
            reject()
        });
    },
    formData: (): Promise<FormData> => {
        return new Promise<FormData>((resolve, reject) => {
            reject()
        });
    },
    json: (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            reject()
        });
    },
    text: (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            reject()
        });
    },
}

describe('test promise Helpers', () => {

    it('test checkStatus avec une response ok: true', () => {
        return expect(new Promise((resolve, reject) => {
            resolve(fakePromiseOk);
        }).then(promiseHelpersAction.checkStatus)).resolves.toBeDefined()
    })

    it('test checkStatus avec une response ok:false', () => {
        return expect(new Promise((resolve, reject) => {
            reject(fakePromiseNotFound);
        }).catch()).rejects.toBeDefined()
    })

    it('test checkStatus avec une response ok:false', () => {
        new Promise((resolve, reject) => {
            reject(fakePromiseNotFound);
        }).catch((r : ErrorObject) => {
            promiseHelpersAction.checkStatus
            expect(r).toBeDefined()
            expect(r.status).toEqual(404)
        });
    })

    it('test checkStatus avec une response ok:false', () => {
        new Promise((resolve, reject) => {
            resolve(fakePromiseNotFound);
        }).then((r : ErrorObject) => {
            promiseHelpersAction.checkStatus
            expect(r).toBeDefined()
            expect(r.status).toEqual(404)
        });
    })

    it('test checkStatus si aucune données reject', () => {
        return new Promise((resolve, reject) => {
            reject()
        }).catch(promiseHelpersAction.checkStatus).catch(e =>
            expect(e.status).toEqual('Sorry, an error occurred'),
        );
    })

    it('test checkStatus si aucune données resolve', () => {
        return new Promise((resolve, reject) => {
            resolve()
        }).catch(promiseHelpersAction.checkStatus).catch(e =>
            expect(e.status).toEqual('Sorry, an error occurred'),
        );
    })

    it('test du handleResponse si response n\'aucune données et est resolve', () => {
        return new Promise((resolve, reject) => {
            resolve()
        }).catch(promiseHelpersAction.handleResponse).catch(e =>
            expect(e.status).toEqual('Sorry, an error occurred'),
        );
    })

    it('test du handleResponse si response n\'aucune données et est reject', () => {
        return new Promise((resolve, reject) => {
            reject()
        }).catch(promiseHelpersAction.handleResponse).catch(e =>
            expect(e.status).toEqual('Sorry, an error occurred')
        );
    })

    it('test du handleResponse si response ok mais pas de json', () => {
        Promise.reject({
            json: () => Promise.reject(),
        }).catch((response: Response) => {
            promiseHelpersAction.handleResponse(response).catch(result => {
                return expect(result.status).toEqual('Sorry, an error occurred');
            })
        });
    })

    it('test du handleResponse si response ok et json', () => {
        Promise.resolve({
            json: () => Promise.resolve(fakeDataPromiseResolve),
        }).then((response: Response) => {
            promiseHelpersAction.handleResponse(response).then((result: any) => {
                return expect(result).toHaveProperty('access_token')
            })
        })
    })
})
