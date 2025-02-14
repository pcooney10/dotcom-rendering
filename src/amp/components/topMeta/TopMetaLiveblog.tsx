import React from 'react';
import { palette } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { css } from 'emotion';
import { pillarPalette, neutralBorder } from '@root/src/lib/pillars';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { MainMedia } from '@root/src/amp/components/MainMedia';
import { Byline } from '@root/src/amp/components/topMeta/Byline';
import { string as curly } from 'curlyquotes';
import { TopMetaExtras } from '@root/src/amp/components/topMeta/TopMetaExtras';
import { ListStyle } from '@root/src/amp/components/elements/Text';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { getAgeWarning } from '@root/src/lib/age-warning';

const headerStyle = (pillar: Pillar) => css`
    ${headline.small()};
    font-weight: 500;
    padding: 3px 10px 24px;
    color: ${palette.neutral[100]};
    background-color: ${pillarPalette[pillar].main};
`;

const bylineStyle = (pillar: Pillar) => css`
    ${headline.xxxsmall()};
    color: ${pillarPalette[pillar].main};
    padding-top: 3px;
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
    }
`;

const standfirstStyle = (pillar: Pillar) => css`
    ${headline.xxxsmall()};
    color: ${palette.neutral[100]};
    background-color: ${pillarPalette[pillar].dark};
    font-weight: bold;
    padding: 3px 10px 12px;

    a {
        color: ${palette.neutral[100]};
    }

    p {
        margin-bottom: 8px;
    }
    strong {
        font-weight: 700;
    }

    ${ListStyle(neutralBorder(pillar))};
`;

const fullWidth = css`
    margin: 0 -10px;
`;

const Headline: React.FC<{
    headlineText: string;
    standfirst: string;
    pillar: Pillar;
    starRating?: number;
}> = ({ headlineText, pillar, standfirst }) => {
    return (
        <div className={fullWidth}>
            <h1 className={headerStyle(pillar)}>{curly(headlineText)}</h1>
            <div // tslint:disable-line:react-no-dangerous-html
                className={standfirstStyle(pillar)}
                dangerouslySetInnerHTML={{
                    __html: standfirst,
                }}
            />
        </div>
    );
};

export const TopMetaLiveblog: React.FC<{
    articleData: ArticleModel;
}> = ({ articleData }) => (
    <header>
        <Headline
            headlineText={articleData.headline}
            standfirst={articleData.standfirst}
            pillar={articleData.pillar}
            starRating={articleData.starRating}
        />

        {articleData.mainMediaElements.map((element, i) => (
            <MainMedia key={i} element={element} pillar={articleData.pillar} />
        ))}

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
