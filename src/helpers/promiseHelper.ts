import ErrorObject from '../constants/common/errorObject'

export const promiseHelpersAction = {
    handleResponse,
    checkStatus
}

function checkStatus(response: Response): Response {
    if (response !== undefined) {
        if (response.ok) {
            return response;

        } else {
            throw new ErrorObject(response.status, response.statusText, response.statusText);
        }
    } else {
        throw new ErrorObject('Sorry, an error occurred')
    }
}

function handleResponse<T>(respons: Response): Promise<T> {
    try {
        return respons.json();
    } catch {
        throw new ErrorObject('Sorry, an error occurred')
    }
}
