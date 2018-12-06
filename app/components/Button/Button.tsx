import './styles.scss';

import * as React from 'react';
import cx from 'classnames';

interface IProps {
    onClick(): void;
    className?: string;
    text?: string | null;
    id?: string;
    [k: string]: any;
}

const Button: React.SFC<IProps> = (props): JSX.Element => {
    const { className, id, onClick, text, children, ...rest } = props;
    return (
        <button
            className={cx('btn', className)}
            id={id}
            onClick={onClick}
            {...rest}>
            {text ? text : children}
        </button>
    );
};

export default Button;
