import { css } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';

export const verticalDivider = css`
    ${from.tablet} {
        :before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 1px;
            height: 100%;
            border-left: 1px solid ${palette.neutral[86]};
        }
    }
`;
