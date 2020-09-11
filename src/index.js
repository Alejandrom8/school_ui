import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducers from './state/reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
    reducers, //Todos los reducers
    {}, //Estado inicial
    applyMiddleware(reduxThunk),
);

ReactDOM.render(
    <Provider store={ store }>
        <App /> { /** Esto permitirá que app tenga accesso a todos los estados*/}
    </Provider>,
    document.getElementById('root')
);
