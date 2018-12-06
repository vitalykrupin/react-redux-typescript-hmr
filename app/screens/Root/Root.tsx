import './styles.scss';

import * as React from 'react';
import cx from 'classnames';

import * as models from './models';
import * as consts from './constants';

import Button from '@components/Button';

export default class Root extends React.Component<models.RootProps> {
    public render(): JSX.Element | null {
        const { value, increment, decrement } = this.props;
        return (
            <section className='example'>
                <div className='example__icn'></div>
                <span className='example__value'>Value: {value}</span>
                <div className='example__btns'>
                    <Button {...{
                        text: 'increment',
                        onClick: increment
                    }} />
                    <Button {...{
                        text: 'decrement',
                        onClick: decrement
                    }} />
                </div>
            </section>
        );
    }
}
