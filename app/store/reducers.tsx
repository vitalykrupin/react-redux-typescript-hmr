import { IApplicationState } from './store.model';
import { combineReducers } from 'redux';

import { reducer as root } from '@screens/Root/reducer';

const reducer = combineReducers<IApplicationState>({
    root
});

export default reducer;
