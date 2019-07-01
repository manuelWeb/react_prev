/// <reference types="react-scripts" />

declare module 'jest-localstorage-mock';

interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: (...args: any[]) => any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (...params: any[]) => any;
}  
