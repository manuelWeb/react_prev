import * as HttpStatus from 'http-status-codes';

export const STATUS_OK = HttpStatus.OK;
export const STATUS_UNAUTHORIZED = HttpStatus.UNAUTHORIZED;
export const STATUS_TIMEDOUT = HttpStatus.REQUEST_TIMEOUT;
export const STATUS_FORBIDDEN = HttpStatus.FORBIDDEN;
export const STATUS_NOT_FOUND = HttpStatus.NOT_FOUND;
export const STATUS_AMBIGUOUS = HttpStatus.MULTIPLE_CHOICES;
export const STATUS_ERROR_SERVER = HttpStatus.INTERNAL_SERVER_ERROR;

/**
 * Checks if response status matches the provided status
 * @param response Response object
 * @param status Query status
 * @returns {boolean} Value indicating whether response status matches query status
 */
function isResponseStatus(response: Response | null, status: number) {
    if (!response) {
        return false;
    }

    return response.status === status;
}

export function isResponseOk(response: Response | null) {
    return isResponseStatus(response, STATUS_OK);
}

export function isResponseUnauthorized(response: Response | null) {
    return isResponseStatus(response, STATUS_UNAUTHORIZED);
}