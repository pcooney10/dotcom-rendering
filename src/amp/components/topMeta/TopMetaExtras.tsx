import React from 'react';
import { css, cx } from 'emotion';
import ClockIcon from '@frontend/static/icons/clock.svg';
import { ShareIcons } from '@root/src/amp/components/ShareIcons';
import { palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { pillarMap, pillarPalette, neutralBorder } from '@root/src/lib/pillars';
import TwitterIcon from '@frontend/static/icons/twitter.svg';

const pillarColours = pillarMap(
    pillar =>
        css`
            color: ${pillarPalette[pillar].main};
        `,
);

const pillarFill = pillarMap(
    pillar =>
        css`
            fill: ${pillarPalette[pillar].main};
        `,
);

const ageWarningCss = css`
    ${textSans.xsmall()};
    display: inline-block;
    margin-bottom: 12px;
    width: 100%;
`;

const metaExtras = css`
    margin-bottom: 6px;
`;

const borders = (pillar: Pillar) => css`
    border-top: 1px solid ${neutralBorder(pillar)};
    border-bottom: 1px solid ${neutralBorder(pillar)};
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 6px;
`;

type SharingURLs = {
    [K in SharePlatform]?: {
        url: string;
        userMessage: string;
    };
};

const metaStyle = css`
    display: block;
    ${textSans.xsmall()};
    color: ${palette.neutral[46]};
    padding-top: 2px;
    margin-bottom: 6px;
    text-decoration: none;
`;

const twitterIcon = css`
    fill: ${palette.neutral[46]};
    height: 12px;
    margin-bottom: -2px;
    width: 12px;
`;

const WebPublicationDate: React.FC<{
    date: string;
}> = ({ date }) => <div className={metaStyle}>{date}</div>;

const AgeWarning: React.FC<{
    warning?: string;
    pillar: Pillar;
}> = ({ warning, pillar }) => {
    if (!warning) {
        return null;
    }

    return (
        <div
            className={cx(
                ageWarningCss,
                pillarColours[pillar],
                pillarFill[pillar],
            )}
        >
            <ClockIcon /> {warning}
        </div>
    );
};

const TwitterHandle: React.FC<{
    handle?: string;
}> = ({ handle }) => {
    if (!handle) {
        return null;
    }

    return (
        <a className={metaStyle} href={`https://twitter.com/${handle}`}>
            <TwitterIcon className={twitterIcon} /> @{handle}
        </a>
    );
};

export const TopMetaExtras: React.FC<{
    sharingUrls: SharingURLs;
    pillar: Pillar;
    webPublicationDate: string;
    ageWarning?: string;
    twitterHandle?: string;
}> = ({
    sharingUrls,
    pillar,
    webPublicationDate,
    ageWarning,
    twitterHandle,
}) => (
    <div className={metaExtras}>
        <TwitterHandle handle={twitterHandle} />
        <WebPublicationDate date={webPublicationDate} />

        <div className={borders(pillar)}>
            <ShareIcons
                sharingUrls={sharingUrls}
                pillar={pillar}
                displayIcons={['facebook', 'twitter', 'email']}
            />
            <AgeWarning warning={ageWarning} pillar={pillar} />
        </div>
    </div>
);
