import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';

const linkStyles = (designType: DesignType, pillar: Pillar) => {
    const baseLinkStyles = css`
        display: flex;
        /* a tag specific styles */
        color: inherit;
        text-decoration: none;

        /* The whole card is one link so we card level styles here */
        width: 100%;

        /* Sometimes a headline contains it's own link so we use the
       approach described below to deal with nested links
       See: https://css-tricks.com/nested-links/ */
        :before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }

        :hover .image-overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            left: 0;
            background-color: ${palette.neutral[7]};
            opacity: 0.1;
        }
    `;

    switch (designType) {
        case 'Comment':
            return css`
                ${baseLinkStyles}
                background-color: ${palette.opinion.faded};
                :hover {
                     /* TODO: This colour is hard coded here because it does not yet
                           exist in src-foundation. Once it's been added, please
                           remove this. @siadcock is aware. */
                    /* stylelint-disable-next-line color-no-hex */
                    background-color: #FDF0E8;
                }
            `;
        case 'Media':
            return css`
                ${baseLinkStyles}
                background-color: ${palette.neutral[20]};

                :hover {
                    filter: brightness(90%);
                }
            `;
        case 'Live':
            return css`
                ${baseLinkStyles}
                background-color: ${palette[pillar].dark};

                :hover {
                    filter: brightness(90%);
                }
            `;
        case 'Article':
        case 'Review':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        case 'Feature':
        case 'Analysis':
        case 'Interview':
        case 'Immersive':
        default:
            return css`
                    ${baseLinkStyles}
                    background-color: ${palette.neutral[97]};

                    :hover {
                        background-color: ${palette.neutral[93]};
                    }
                `;
    }
};

type Props = {
    children: JSXElements;
    linkTo: string;
    designType: DesignType;
    pillar: Pillar;
};

export const CardLink = ({ children, linkTo, designType, pillar }: Props) => (
    <a href={linkTo} className={linkStyles(designType, pillar)}>
        {children}
    </a>
);
