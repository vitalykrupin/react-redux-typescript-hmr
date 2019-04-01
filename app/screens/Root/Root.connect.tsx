import { connect } from 'react-redux';

import * as models from './models';
import { IApplicationState } from '@root/store';

import Root from './Root';
import { increment, decrement } from './actions';

const mapStateToProps = (state: IApplicationState): models.IMapStateToProps => {
    const { value } = state.root;
    return {
        value
    };
};

export const mapDispatchToProps: models.IMapDispatchToProps = {
    increment,
    decrement
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Root);
