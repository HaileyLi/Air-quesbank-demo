import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './Store/rootReducer'
import App from './containers/App.jsx'
import Store from "./Store/Store";
import serviceWorker from "./serviceWorker";


render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
)