import React from 'react';
import { css } from 'emotion';

type Props = {
    children: ChildrenType;
};

export const LinesWrapper = ({ children }: Props) => (
    <div
        className={css`
            flex-grow: 1;
            margin-top: 3px;
            margin-left: -5px;
            margin-right: 5px;
        `}
    >
        {children}
    </div>
);
