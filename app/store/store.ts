import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(
        applyMiddleware(
            thunk,
            createLogger({
                collapsed: true,
                timestamp: false
            })
        )
    ));

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
};

export default configureStore;
