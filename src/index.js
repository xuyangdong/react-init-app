/* eslint-disable */
import 'babel-polyfill'
import 'general-polyfill'
import 'whatwg-fetch'
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createMyStore} from './store'
import reducer from './reducer'
import {Provider} from 'react-redux'
import routes from './routes'

const store = createMyStore(reducer)
ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('root'));
registerServiceWorker();
