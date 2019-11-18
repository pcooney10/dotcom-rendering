import React from 'react';

import { palette } from '@guardian/src-foundations';

import { SmallHeadline } from '@frontend/web/components/SmallHeadline';
import { Standfirst } from '@frontend/web/components/Standfirst';
import { ImageComponent } from '@frontend/web/components/elements/ImageComponent';
import { Flex } from '@frontend/web/components/Flex';
import { GuardianLines } from '@frontend/web/components/GuardianLines';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { CardLayout } from './components/CardLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { LinesWrapper } from './components/LinesWrapper';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardListItem } from './components/CardListItem';
import { CardAge } from './components/CardAge';

type CoveragesType = {
    image: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
    content: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
};

const coverages: CoveragesType = {
    // coverages is how we set the image size relative to the space given
    // to the headline. These percentages are passed to flex-basis inside the
    // wrapper components
    image: {
        small: '25%',
        medium: '50%',
        large: '67%',
        jumbo: '75%',
    },
    content: {
        small: '75%',
        medium: '50%',
        large: '33%',
        jumbo: '25%',
    },
};

export const Card = ({
    linkTo,
    pillar,
    headline,
    webPublicationDate,
    image,
    standfirst,
    percentage,
}: CardType) => {
    // If there was no image given or image size was not set, percentage is null and
    // no flex-basis property is set in the wrappers, so content flows normally
    const imageCoverage =
        (image && image.size && coverages.image[image.size]) || '50%';
    const contentCoverage =
        (image && image.size && coverages.content[image.size]) || '50%';

    const spaceContent = !image;

    const isOpinion = pillar === 'opinion';

    return (
        <CardListItem percentage={percentage}>
            <CardLink
                linkTo={linkTo}
                backgroundColour={
                    isOpinion ? palette.opinion.faded : palette.neutral[97]
                }
                backgroundOnHover={
                    // Should be '#FDF0E8'
                    isOpinion ? palette.opinion.faded : palette.neutral[93]
                }
            >
                <TopBar topBarColour={palette[pillar].main}>
                    <CardLayout imagePosition={image && image.position}>
                        <>
                            {image && (
                                <ImageWrapper percentage={imageCoverage}>
                                    <ImageComponent
                                        element={image.element}
                                        pillar={pillar}
                                        hideCaption={true}
                                    />
                                </ImageWrapper>
                            )}
                            <ContentWrapper
                                percentage={contentCoverage}
                                spaceContent={spaceContent}
                            >
                                <HeadlineWrapper>
                                    <SmallHeadline {...headline} />
                                </HeadlineWrapper>
                                <div>
                                    {standfirst && (
                                        <StandfirstWrapper>
                                            <Standfirst
                                                pillar={pillar}
                                                standfirst={standfirst}
                                            />
                                        </StandfirstWrapper>
                                    )}
                                    <Flex direction="row">
                                        <>
                                            {isOpinion && (
                                                <LinesWrapper>
                                                    <GuardianLines pillar="opinion" />
                                                </LinesWrapper>
                                            )}
                                            {webPublicationDate && (
                                                <CardAge
                                                    webPublicationDate={
                                                        webPublicationDate
                                                    }
                                                />
                                            )}
                                        </>
                                    </Flex>
                                </div>
                            </ContentWrapper>
                        </>
                    </CardLayout>
                </TopBar>
            </CardLink>
        </CardListItem>
    );
};
