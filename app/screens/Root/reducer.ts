import { Reducer } from 'redux';
import * as models from './models';
import { IRootState } from '@root/store';
import * as consts from './constants';

const INITIAL_STATE: IRootState = {
    value: 0
};

export const reducer: Reducer<IRootState, models.KnownAction> =
    (state: IRootState = INITIAL_STATE, action: models.KnownAction): IRootState => {
        switch (action.type) {
            case consts.ROOT_INCREMENT_VALUE:
                return {
                    ...state,
                    value: state.value + 1
                };
            case consts.ROOT_DECREMENT_VALUE:
                return {
                    ...state,
                    value: state.value - 1
                };
            default:
                return state;
        }
    };

export default reducer;
