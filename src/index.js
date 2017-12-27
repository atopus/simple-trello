import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import { composeWithDevTools } from 'redux-devtools-extension'
// import Store from './Store'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
