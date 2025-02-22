import React from 'react';
import { css } from 'emotion';
import Quote from '@frontend/static/icons/quote.svg';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { unescapeData } from '@root/src/lib/escapeData';

const gutter = 20;
const quoteTail = 25;
const quoteMark = 35;

const gsSpan = (nColumns: number) => nColumns * 60 + gutter * (nColumns - 1);

const commonStyles = (pillar: Pillar) =>
    css(`
    font-weight: bold;
    position: relative;
    background-color: ${palette.neutral[97]};
    padding: 0.375rem 0.625rem 0.75rem;
    margin-bottom: 1.75rem;
    color: ${pillarPalette[pillar].dark};

    :after {
        content: '';
        width: ${quoteTail}px;
        height: ${quoteTail}px;
        bottom: -${quoteTail}px;
        position: absolute;
        background-color: ${palette.neutral[97]};
    }

    cite,
    svg {
        color: ${pillarPalette[pillar].main};
        fill: ${pillarPalette[pillar].main};
    }
`);

const supportingStyles = (pillar: Pillar) =>
    css(
        `
        width: ${gsSpan(3)}px;
        margin-left: -${gutter / 2}px;
        margin-right: 0.6rem;
        clear: left;
        float: left;
        ${body.medium()};

        ${from.leftCol} {
            margin-left: -${gutter / 2 + gsSpan(3) / 2}px;
        }

        :after {
            left: ${gutter / 2};
            border-radius: 0 0 ${quoteTail}px;

            ${from.leftCol} {
                border-radius: 0 0 0 ${quoteTail}px;
                left: 0rem;
                margin-left: ${gsSpan(3) / 2 - quoteTail + 1}px;
            }
        }`,
        commonStyles(pillar),
    );

const inlineStyles = (pillar: Pillar) =>
    css(
        `
        margin-left: 0rem;
        display: block;
        ${body.medium()};

        ${from.mobileLandscape} {
            margin-left: -${gutter}px;
        }
        ${from.phablet} {
            margin-left: -${gutter / 2}px;
        }
        ${from.leftCol} {
            margin-left: -3.5rem;
        }

        :after {
            left: 0rem;
            border-radius: 0 0 ${quoteTail}px;

            ${from.mobileLandscape} {
                left: ${gutter}px;
            }
            ${from.phablet} {
                left: ${gutter / 2}px;
            }
            ${from.desktop} {
                left: 0px;
            }
            ${from.leftCol} {
                left: ${quoteMark + gutter / 2}px;
            }
        }`,
        commonStyles(pillar),
    );

function getStyles(role: string, pillar: Pillar) {
    return role === 'supporting'
        ? supportingStyles(pillar)
        : inlineStyles(pillar);
}

export const PullQuoteComponent: React.FC<{
    html: string;
    pillar: Pillar;
    role: string;
    attribution?: string;
}> = ({ html, pillar, attribution, role }) => (
    <aside className={getStyles(role, pillar)}>
        <Quote />{' '}
        <span // tslint:disable-line:react-no-dangerous-html
            dangerouslySetInnerHTML={{
                __html: unescapeData(html),
            }}
        />
        <footer>
            <cite>{attribution}</cite>
        </footer>
    </aside>
);
