import './styles/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/store';
import { createRootElementIn } from '@core/utils';
import Root from '@screens/Root';

document.addEventListener('DOMContentLoaded', () => {

    const store = configureStore();

    const root = (() => {
        return createRootElementIn(document.body);
    })();

    const render = (Component) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <Root />
                </Provider>
            </AppContainer>,
            root
        );
    };

    render(Root);

    if (module.hot) {
        module.hot.accept('@screens/Root', () => {
            render(Root);
        });
    }
});
