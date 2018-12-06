import * as models from './models';
import * as consts from './constants';

export interface IMapStateToProps {
    value: number;
}
export interface IMapDispatchToProps {
    increment(): models.IIncrementValue;
    decrement(): models.IDecrementValue;
}

export type RootProps = IMapStateToProps & IMapDispatchToProps;

export interface IIncrementValue {
    type: consts.ROOT_INCREMENT_VALUE;
}

export interface IDecrementValue {
    type: consts.ROOT_DECREMENT_VALUE;
}

export type KnownAction = IIncrementValue
    | IDecrementValue;
