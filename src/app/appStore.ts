import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/appReducer';

/// Cofig de Redux DevTools : window déclaré dans react-app-env.d.ts
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store global de l'application.
 */
const appStore = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

export default appStore;
