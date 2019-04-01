import './styles/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createRootElementIn } from '@core/utils';
import Root from '@screens/Root';
import store from './store';

document.addEventListener('DOMContentLoaded', () => {

    const appStore = store.store;

    const root = (() => {
        return createRootElementIn(document.body);
    })();

    const render = (Component) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={appStore}>
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
