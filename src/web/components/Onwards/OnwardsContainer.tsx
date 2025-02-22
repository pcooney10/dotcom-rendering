import React from 'react';
import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const OnwardsContainer = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-grow: 1;
            flex-direction: column;

            margin-top: 6px;
            ${from.leftCol} {
                margin-top: 36px;
            }

            margin-bottom: 60px;

            margin-left: 0px;
            margin-right: 0px;

            ${from.tablet} {
                /* Shrink the container to remove the leading and
                   trailing side margins from the list of cards */
                margin-left: -10px;
                margin-right: -10px;
            }

            ${from.leftCol} {
                margin-left: 0px;
                margin-right: -10px;
            }

            ${from.wide} {
                margin-right: 70px;
                margin-top: 8px;
            }
        `}
    >
        {children}
    </div>
);
