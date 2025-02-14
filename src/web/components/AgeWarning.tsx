import React from 'react';
import { css } from 'emotion';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

const ageWarningStyles = (isSmall: boolean) => css`
    ${isSmall ? textSans.xsmall() : textSans.medium()};
    color: ${palette.neutral[7]};
    background-color: ${palette.brandYellow.main};
    display: inline-block;

    > strong {
        font-weight: bold;
    }

    padding: ${isSmall ? '3px 5px' : '6px 10px'};

    ${from.mobileLandscape} {
        padding-left: ${isSmall ? '6px' : '12px'};
    }

    ${from.leftCol} {
        padding-left: ${isSmall ? '5px' : '10px'};
    }
`;

const ageWarningScreenReader = css`
    ${visuallyHidden};
`;

type Props = {
    age: string;
    isScreenReader?: boolean;
    size?: 'small' | 'medium';
};

export const AgeWarning = ({ age, isScreenReader, size = 'medium' }: Props) => {
    const warningPrefix = 'This article is more than ';
    const isSmall = size === 'small';

    if (isScreenReader) {
        return (
            <div className={ageWarningScreenReader}>{warningPrefix + age}</div>
        );
    }

    return (
        <div className={ageWarningStyles(isSmall)} aria-hidden="true">
            <ClockIcon /> {warningPrefix}
            <strong>{age}</strong>
        </div>
    );
};
