import React from 'react';
import { css, cx } from 'emotion';
import { useTheme } from 'emotion-theming';

import { palette } from '@guardian/src-foundations';

import { PulsingDot } from '@root/src/web/components/PulsingDot';

const kickerStyles = (colour: string) => css`
    color: ${colour};
    font-weight: 700;
    margin-right: 4px;
`;

const slashStyles = css`
    &::after {
        content: '/';
        display: inline-block;
        margin-left: 4px;
    }
`;

export const Kicker = ({
    text,
    pillar,
    showPulsingDot,
    showSlash = true,
}: KickerType) => {
    const theme = useTheme<ThemeType>();
    const colour =
        theme.kicker.colour || (pillar && palette[pillar].main) || '';

    return (
        <span className={kickerStyles(colour)}>
            {showPulsingDot && <PulsingDot colour={colour} />}
            <span className={cx(showSlash && slashStyles)}>{text}</span>
        </span>
    );
};
