// tslint:disable:interface-over-type-literal

export const ALERT_SUCCESS: string = 'ALERT_SUCCESS';
export type ALERT_SUCCESS = {
    message: string;
    className: 'alert--success';
}

export const ALERT_ERROR: string = 'ALERT_ERROR';
export type ALERT_ERROR = {
    message: string;
    className: 'alert--danger';
}

export const ALERT_CLEAR: string = 'ALERT_CLEAR';
export type ALERT_CLEAR = {}

export type AleltEnum = ALERT_CLEAR | ALERT_ERROR | ALERT_SUCCESS