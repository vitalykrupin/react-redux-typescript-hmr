import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export interface IRootState {
    value: number;
}

export interface IApplicationState {
    root: IRootState;
}

export interface IRegisterReducer {
    [key: string]: Function;
}

interface IApplicationStore {
    store: Store;
    registerReducer(reducers: IRegisterReducer): void;
}

export class ApplicationStore {

    private _store: Store;
    private _collection = {};

    constructor() {
        this._store = createStore(() => ({}), composeWithDevTools(
            applyMiddleware(
                thunk,
                createLogger({
                    collapsed: true,
                    timestamp: false
                })
            )
        ));
    }

    public registerReducer(reducers: IRegisterReducer): void {
        if (!reducers) {
            return;
        }
        for (let r in reducers) {
            if (reducers.hasOwnProperty(r)) {
                this._collection[r] = reducers[r];
            }
        }
        this._store.replaceReducer(combineReducers({
            ...this._collection
        }));
    }

    public get store(): Store {
        return this._store;
    }
}

export default new ApplicationStore();
