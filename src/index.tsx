import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from './app/appStore';
import App from './app/App';
import './scss/main.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={appStore}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
