import * as models from './models';
import * as consts from './constants';

import { Action, ActionCreator, Dispatch } from 'redux';

export const increment = (): models.IIncrementValue => {
    return {
        type: consts.ROOT_INCREMENT_VALUE
    };
};

export const decrement = (): models.IDecrementValue => {
    return {
        type: consts.ROOT_DECREMENT_VALUE
    };
};
