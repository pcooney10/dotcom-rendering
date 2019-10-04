import React from 'react';
import { css } from 'emotion';

import { BigNumber } from '@guardian/guui';
import { palette } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/typography';

import { TrailType } from './MostViewed';

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

const liveKicker = css`
    color: ${palette.news.main};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

export const TrailItem = ({
    trail,
    position,
}: {
    trail: TrailType;
    position: number;
}) => {
    return (
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
                        <span className={liveKicker}>Live</span>
                    )}
                    {trail.linkText}
                </a>
            </h2>
        </li>
    );
};
