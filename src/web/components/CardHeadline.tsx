import React from 'react';
import { css, cx } from 'emotion';
import { useTheme } from 'emotion-theming';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';

type CardHeadlineType = {
    headlineString: string; // The text shown
    pillar: Pillar; // Used to colour the headline (dark) and the kicker (main)
    showUnderline?: boolean; // Some headlines have text-decoration underlined when hovered
    kicker?: KickerType;
    showQuotes?: boolean; // When true the QuoteIcon is shown
    size?: SmallHeadlineSize;
    linkTo?: string; // An optional link object configures if/how the component renders an anchor tag
};

const fontStyles = (size: SmallHeadlineSize) => css`
    ${headline[size]()};
`;

const textDecorationUnderline = css`
    text-decoration: underline;
`;

const underlinedStyles = (size: SmallHeadlineSize) => {
    function generateUnderlinedCss(baseSize: number) {
        return css`
            display: inline;
            background-image: linear-gradient(
                to bottom,
                transparent,
                transparent ${baseSize - 1}px,
                rgba(199, 0, 0, 0.5)
            );
            line-height: ${baseSize}px;
            background-size: 1px ${baseSize}px;
            background-origin: content-box;
            background-clip: content-box;
        `;
    }
    switch (size) {
        case 'tiny':
            return generateUnderlinedCss(20);
        case 'xxsmall':
            return generateUnderlinedCss(23);
        case 'xsmall':
            return generateUnderlinedCss(28);
        default:
            return generateUnderlinedCss(23);
    }
};

const colourStyles = (colour: string) => css`
    color: ${colour};
`;

const linkStyles = css`
    position: relative;

    color: inherit;

    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

export const CardHeadline = ({
    headlineString,
    pillar,
    showUnderline = false,
    kicker,
    showQuotes = false,
    size = 'xxsmall',
    linkTo,
}: CardHeadlineType) => {
    const theme = useTheme<ThemeType>();

    return (
        <h4 className={fontStyles(size)}>
            {kicker && (
                <Kicker
                    text={kicker.text}
                    showPulsingDot={kicker.showPulsingDot}
                    showSlash={kicker.showSlash}
                />
            )}
            {showQuotes && (
                <QuoteIcon colour={palette[pillar].main} size={size} />
            )}
            {linkTo ? (
                // We were passed a link object so headline should be a link, with link styling
                <a
                    className={cx(
                        // Composed styles - order matters for colours
                        linkStyles,
                        showUnderline && textDecorationUnderline,
                    )}
                    href={linkTo}
                >
                    {headlineString}
                </a>
            ) : (
                // We don't have a link so simply use a span here
                <span
                    className={cx(
                        theme.card.headlineUnderlined && underlinedStyles(size),
                        colourStyles(theme.card.headlineColour),
                    )}
                >
                    {headlineString}
                </span>
            )}
        </h4>
    );
};
