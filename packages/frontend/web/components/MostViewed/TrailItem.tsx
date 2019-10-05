import React from 'react';
import { css } from 'emotion';

import { BigNumber } from '@guardian/guui';
import { palette } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/typography';
import { pillarPalette } from '@frontend/lib/pillars';

import { TrailType } from './MostViewed';
import { PulsingDot } from './PulsingDot';
// import { QuoteIcon } from './QuoteIcon';

const gridItem = css`
    position: relative;
    /* box-sizing: border-box; */
    border-top: 1px solid ${palette.neutral[86]};
    border-right: 1px solid ${palette.neutral[86]};
    min-height: 3.25rem;

    &:hover {
        cursor: pointer;
    }

    &:hover,
    :focus {
        background: ${palette.neutral[97]};
    }
`;

const bigNumber = css`
    position: absolute;
    top: 0.375rem;
    left: 0.625rem;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    padding: 0.1875rem 0.625rem 1.125rem 4.6875rem;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline(2)};
`;

const liveKicker = (colour: string) => css`
    color: ${colour};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

function getColour(trail: TrailType) {
    // TODO: The trail object returned from the api does not include the pillar for the
    //       the article. Once it does, replace 'news' below with the relevant pillar
    return pillarPalette.news.dark;
}

interface Props {
    trail: TrailType;
    position: number;
}

export const TrailItem = ({ trail, position }: Props) => (
    <li
        className={gridItem}
        key={trail.url}
        data-link-name={`${position} | text`}
    >
        <span className={bigNumber}>
            <BigNumber index={position} />
        </span>
        <h2 className={headlineHeader}>
            <a
                className={headlineLink}
                href={trail.url}
                data-link-name={'article'}
            >
                {trail.isLiveBlog && (
                    <span className={liveKicker(getColour(trail))}>
                        <PulsingDot colour={getColour(trail)} /> Live
                    </span>
                )}
                {/* TODO: The api response needs to contain the pillar for the article so we can
                          decide when to show the quote icon. Replace  `isOpinion` below with
                          the correct check once the api has been updated */}
                {/* {trail.isOpinion && <QuoteIcon colour={getColour(trail)} />} */}
                {trail.linkText}
            </a>
        </h2>
    </li>
);
