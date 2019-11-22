import React from 'react';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { css, cx } from 'emotion';
import { pillarPalette } from '@root/src/lib/pillars';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { MainMedia } from '@root/src/amp/components/MainMedia';
import { Byline } from '@root/src/amp/components/topMeta/Byline';
import { TopMetaExtras } from '@root/src/amp/components/topMeta/TopMetaExtras';
import { Standfirst } from '@root/src/amp/components/topMeta/Standfirst';
import { SeriesLink } from '@root/src/amp/components/topMeta/SeriesLink';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { getAgeWarning } from '@root/src/lib/age-warning';
import { Branding } from '@root/src/amp/components/topMeta/Branding';

const headerStyle = css`
    ${headline.small()};
    font-weight: 100;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline.small()};
    color: ${pillarPalette[pillar].main};
    font-style: italic;
    font-weight: 100;
    padding-top: 3px;

    a {
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
    }
`;

const bylineImageStyle = css`
    display: block;
    margin-right: -18px;
    flex-shrink: 0;
`;

const bylineWrapper = css`
    display: flex;
    justify-content: space-between;

    background-image: repeating-linear-gradient(
        to bottom,
        ${palette.neutral[86]},
        ${palette.neutral[86]} 1px,
        transparent 1px,
        transparent 4px
    );
    background-repeat: repeat-x;
    background-position: bottom;
    background-size: 1px 29px;
    margin: 0 -10px;
    padding: 0 10px;
`;

const bottomPadding = css`
    padding-bottom: 72px;
`;

const BylineMeta: React.SFC<{
    articleData: ArticleModel;
    pillar: Pillar;
}> = ({ articleData, pillar }) => {
    const contributorTag = articleData.tags.find(t => t.type === 'Contributor');
    const bylineImageUrl = contributorTag
        ? contributorTag.bylineImageUrl
        : null;

    return (
        <div className={bylineWrapper}>
            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={pillar}
                guardianBaseURL={articleData.guardianBaseURL}
                className={cx(bylineStyle(pillar), {
                    [bottomPadding]: !bylineImageUrl,
                })}
            />

            {contributorTag && bylineImageUrl && (
                <amp-img
                    class={bylineImageStyle}
                    src={bylineImageUrl}
                    alt={`Contributor image for: ${contributorTag.title}`}
                    width="180"
                    height="150"
                />
            )}
        </div>
    );
};

export const TopMetaOpinion: React.FC<{
    articleData: ArticleModel;
    pillar: Pillar;
}> = ({ articleData, pillar }) => {
    const {branding} = articleData.commercialProperties[articleData.editionId];

    return (
        <header>
            {articleData.mainMediaElements.map((element, i) => (
                <MainMedia key={i} element={element} pillar={pillar} />
            ))}

            <SeriesLink
                baseURL={articleData.guardianBaseURL}
                tags={articleData.tags}
                pillar={pillar}
                fallbackToSection={false}
            />

            <h1 className={headerStyle}>{articleData.headline}</h1>

            {branding && <Branding branding={branding} pillar={pillar} />}

            <BylineMeta articleData={articleData} pillar={pillar} />

            <Standfirst text={articleData.standfirst} pillar={pillar} />

            <TopMetaExtras
                sharingUrls={getSharingUrls(
                    articleData.pageId,
                    articleData.webTitle,
                )}
                pillar={pillar}
                ageWarning={getAgeWarning(
                    articleData.tags,
                    articleData.webPublicationDate,
                )}
                webPublicationDate={articleData.webPublicationDateDisplay}
                twitterHandle={articleData.author.twitterHandle}
            />
        </header>
    );
};
