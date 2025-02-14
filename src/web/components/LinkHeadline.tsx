import React from 'react';
import { css, cx } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { QuoteIcon } from '@root/src/web/components/QuoteIcon';
import { Kicker } from '@root/src/web/components/Kicker';
import { Byline } from '@root/src/web/components/Byline';

const fontStyles = (size: SmallHeadlineSize) => {
    switch (size) {
        case 'large':
            return css`
                ${headline.xsmall()};
            `;
        case 'medium':
            return css`
                ${headline.xxsmall()};
            `;
        case 'small':
            return css`
                ${headline.xxxsmall()};
            `;
        case 'tiny':
            return css`
                ${headline.xxxsmall()};
                font-size: 14px;
            `;
    }
};

const textDecorationUnderline = css`
    text-decoration: underline;
`;

const linkStyles = css`
    position: relative;

    color: inherit;

    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

const visitedStyles = (visitedColour: string) => css`
    :visited {
        color: ${visitedColour};
    }
`;

export const LinkHeadline = ({
    designType,
    headlineText,
    pillar,
    showUnderline = false,
    kickerText,
    showPulsingDot,
    showSlash,
    showQuotes = false,
    size = 'medium',
    link,
    byline,
}: LinkHeadlineType) => (
    <h4 className={fontStyles(size)}>
        {kickerText && (
            <Kicker
                text={kickerText}
                designType={designType}
                pillar={pillar}
                showPulsingDot={showPulsingDot}
                showSlash={showSlash}
            />
        )}
        {showQuotes && <QuoteIcon colour={palette[pillar].main} size={size} />}
        {link ? (
            // We were passed a link object so headline should be a link, with link styling
            <>
                <a
                    className={cx(
                        // Composed styles - order matters for colours
                        linkStyles,
                        showUnderline && textDecorationUnderline,
                        link.visitedColour && visitedStyles(link.visitedColour),
                    )}
                    href={link.to}
                    // If link.preventFocus is true, set tabIndex to -1 to ensure this
                    // link is not tabbed to. Useful if there is an outer link to the same
                    // place, such as with MostViewed
                    tabIndex={link.preventFocus ? -1 : undefined}
                >
                    {headlineText}
                </a>
                {byline && (
                    <Byline
                        text={byline}
                        designType={designType}
                        pillar={pillar}
                        size={size}
                    />
                )}
            </>
        ) : (
            // We don't have a link so simply use a span here
            <>
                <span>{headlineText}</span>
                {byline && (
                    <Byline
                        text={byline}
                        designType={designType}
                        pillar={pillar}
                        size={size}
                    />
                )}
            </>
        )}
    </h4>
);
