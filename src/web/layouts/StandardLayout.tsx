import React from 'react';

import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleBodyContainer } from '@root/src/web/components/ArticleBodyContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';

import { palette } from '@guardian/src-foundations';

import { Header } from '@root/src/web/components/Header/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';

import GE2019 from '@frontend/static/badges/general-election-2019.svg';

import { MobileStickyContainer } from '@root/src/web/components/AdSlot';

function checkForGE2019Badge(tags: TagType[]) {
    if (tags.find(tag => tag.id === 'politics/general-election-2019')) {
        return {
            linkTo: '/politics/general-election-2019',
            svgSrc: GE2019,
        };
    }
    return;
}

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    layoutType: LayoutType;
}

export const StandardLayout = ({ CAPI, NAV, layoutType }: Props) => {
    const GE2019Badge = checkForGE2019Badge(CAPI.tags);
    const { isPaidContent } = CAPI.config;
    return (
        <>
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
            >
                <HeaderAdSlot
                    isAdFreeUser={CAPI.isAdFreeUser}
                    shouldHideAds={CAPI.shouldHideAds}
                />
            </Section>
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Header
                    nav={NAV}
                    pillar={CAPI.pillar}
                    edition={CAPI.editionId}
                />
            </Section>

            <Section
                islandId="nav-root"
                showSideBorders={true}
                borderColour={palette.brand.pastel}
                showTopBorder={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Section>

            {NAV.subNavSections && (
                <Section backgroundColour={palette.neutral[100]} padded={false}>
                    <SubNav
                        subnav={NAV.subNavSections}
                        currentNavLink={NAV.currentNavLink}
                        pillar={CAPI.pillar}
                    />
                </Section>
            )}

            <Section showTopBorder={false} padded={false}>
                <ArticleContainer layoutType={layoutType}>
                    <ArticleTitle CAPI={CAPI} badge={GE2019Badge} />
                    <ArticleHeadline
                        headlineString={CAPI.headline}
                        designType={CAPI.designType}
                        pillar={CAPI.pillar}
                        webPublicationDate={CAPI.webPublicationDate}
                        tags={CAPI.tags}
                    />
                    <ArticleMeta CAPI={CAPI} />
                    <ArticleStandfirst
                        designType={CAPI.designType}
                        pillar={CAPI.pillar}
                        standfirst={CAPI.standfirst}
                    />
                    <MainMedia
                        elements={CAPI.mainMediaElements}
                        pillar={CAPI.pillar}
                    />
                    <ArticleBodyContainer>
                        <ArticleBody CAPI={CAPI} />
                        <GuardianLines pillar={CAPI.pillar} />
                        <SubMeta
                            pillar={CAPI.pillar}
                            subMetaKeywordLinks={CAPI.subMetaKeywordLinks}
                            subMetaSectionLinks={CAPI.subMetaSectionLinks}
                            pageId={CAPI.pageId}
                            webUrl={CAPI.webURL}
                            webTitle={CAPI.webTitle}
                            showBottomSocialButtons={
                                CAPI.showBottomSocialButtons
                            }
                            badge={GE2019Badge}
                        />
                    </ArticleBodyContainer>
                    <RightColumn>
                        <StickyAd />
                        {!isPaidContent ? <MostViewedRightIsland /> : <></>}
                    </RightColumn>
                </ArticleContainer>
            </Section>

            <Section islandId="story-package" />

            {!isPaidContent && (
                <>
                    <Section showTopBorder={false}>
                        <OutbrainContainer />
                    </Section>

                    <Section islandId="most-viewed-footer" />
                </>
            )}

            {NAV.subNavSections && (
                <Section padded={false}>
                    <SubNav
                        subnav={NAV.subNavSections}
                        pillar={CAPI.pillar}
                        currentNavLink={NAV.currentNavLink}
                    />
                </Section>
            )}

            <Section
                padded={false}
                backgroundColour={palette.brand.main}
                borderColour={palette.brand.pastel}
            >
                <Footer
                    nav={NAV}
                    edition={CAPI.editionId}
                    pageFooter={CAPI.pageFooter}
                    pillar={CAPI.pillar}
                    pillars={NAV.pillars}
                />
            </Section>

            <div data-island="cookie-banner" />
            <MobileStickyContainer />
        </>
    );
};
