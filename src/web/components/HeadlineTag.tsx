import React from 'react';
import { css } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';

const headlineTagWrapper = css`
    margin-left: 6px;
`;

const headlineTagStyles = (pillar: Pillar) => css`
    background-color: ${pillarPalette[pillar].dark};
    color: ${palette.neutral[100]};
    ${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
    box-shadow: 0.25rem 0 0 ${pillarPalette[pillar].dark}, -0.375rem 0 0 ${
    pillarPalette[pillar].dark
};
    display: inline-block;
    box-decoration-break: clone;
`;

type Props = {
    tagText: string;
    pillar: Pillar;
};

export const HeadlineTag = ({ tagText, pillar }: Props) => (
    <div className={headlineTagWrapper}>
        <div className={headlineTagStyles(pillar)}>{tagText}</div>
    </div>
);
