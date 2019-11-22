import React from 'react';
import { css, cx } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { MainMedia } from '@root/src/amp/components/MainMedia';
import { Byline } from '@root/src/amp/components/topMeta/Byline';
import { string as curly } from 'curlyquotes';
import { TopMetaExtras } from '@root/src/amp/components/topMeta/TopMetaExtras';
import { Standfirst } from '@root/src/amp/components/topMeta/Standfirst';
import { SeriesLink } from '@root/src/amp/components/topMeta/SeriesLink';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { getAgeWarning } from '@root/src/lib/age-warning';
import { Branding } from '@root/src/amp/components/topMeta/Branding';
import { StarRating } from '@root/src/amp/components/StarRating';

const headerStyle = css`
    ${headline.small()};
    font-weight: 500;
    padding-bottom: 24px;
    padding-top: 3px;
    color: ${palette.neutral[7]};
`;
const bylineStyle = (pillar: Pillar) => css`
    ${headline.tiny()};
    color: ${pillarPalette[pillar].main};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
    }
`;

const starRatingWrapper = css`
    margin: 0 0 6px -10px;
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, standfirst, pillar, starRating }) => {
    return (
        <div>
            <h1 className={cx(headerStyle)}>{curly(headlineText)}</h1>

            {starRating !== undefined && (
                <div className={starRatingWrapper}>
                    <StarRating rating={starRating} size="large" />
                </div>
            )}
        </div>
    );
};

export const TopMetaNews: React.FC<{
    articleData: ArticleModel;
    adTargeting?: AdTargeting;
}> = ({ articleData, adTargeting }) => {
    const {branding} = articleData.commercialProperties[articleData.editionId];

    return (
        <header>
            {articleData.mainMediaElements.map((element, i) => (
                <MainMedia
                    key={i}
                    element={element}
                    pillar={articleData.pillar}
                    adTargeting={adTargeting}
                />
            ))}

            {!articleData.isImmersive && (
                <SeriesLink
                    baseURL={articleData.guardianBaseURL}
                    tags={articleData.tags}
                    pillar={articleData.pillar}
                    fallbackToSection={true}
                    sectionLabel={articleData.sectionLabel}
                    sectionUrl={articleData.sectionUrl}
                />
            )}

            <Headline
                headlineText={articleData.headline}
                standfirst={articleData.standfirst}
                pillar={articleData.pillar}
                starRating={articleData.starRating}
            />

            <Standfirst
                text={articleData.standfirst}
                pillar={articleData.pillar}
            />

            {branding && (
                <Branding branding={branding} pillar={articleData.pillar} />
            )}

            <Byline
                byline={articleData.author.byline}
                tags={articleData.tags}
                pillar={articleData.pillar}
                guardianBaseURL={articleData.guardianBaseURL}
                className={bylineStyle(articleData.pillar)}
            />

            <TopMetaExtras
                sharingUrls={getSharingUrls(
                    articleData.pageId,
                    articleData.webTitle,
                )}
                pillar={articleData.pillar}
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
