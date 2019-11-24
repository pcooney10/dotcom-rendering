import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@frontend/web/components/lib/dateTime';

const ageStyles = (ageColour: string, clockColour: string) => css`
    ${textSans.xsmall()};
    color: ${clockColour};
    svg {
        fill: ${clockColour};
        margin-bottom: -1px;
        height: 11px;
        width: 11px;
        margin-right: 2px;
    }
`;

type Props = {
    webPublicationDate: string;
};

export const CardAge = ({ webPublicationDate }: Props) => {
    const theme = useTheme<ThemeType>();

    const displayString = makeRelativeDate(
        new Date(webPublicationDate).getTime(),
        {
            format: 'short',
        },
    );

    if (!displayString) {
        return null;
    }

    return (
        <span
            className={ageStyles(theme.card.ageColour, theme.card.clockColour)}
        >
            <ClockIcon />
            <time dateTime={webPublicationDate}>{displayString}</time>
        </span>
    );
};
