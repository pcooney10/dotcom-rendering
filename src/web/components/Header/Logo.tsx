import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import TheGuardianLogoSVG from '@frontend/static/logos/the-guardian.svg';

const link = css`
    float: right;
    margin-top: 10px;
    margin-right: 54px;
    margin-bottom: 21px;

    ${from.mobileMedium} {
        margin-right: 10px;
    }
    ${from.mobileLandscape} {
        margin-right: 20px;
    }
    ${from.desktop} {
        margin-top: 5px;
        margin-bottom: 15px;
        position: relative;
        z-index: 1071;
    }
    ${from.wide} {
        margin-right: 96px;
    }
`;

const style = css`
    height: 44px;
    width: 135px;
    ${from.mobileMedium} {
        height: 56px;
        width: 175px;
    }
    ${from.tablet} {
        height: 72px;
        width: 224px;
    }
    ${from.desktop} {
        height: 95px;
        width: 295px;
    }

    path {
        fill: ${palette.neutral[100]};
    }
`;

const SVG = () => <TheGuardianLogoSVG className={style} />;

export const Logo: React.FC = () => (
    <a className={link} href="/" data-link-name="nav2 : logo">
        <span
            className={css`
                ${visuallyHidden};
            `}
        >
            The Guardian - Back to home
        </span>
        <SVG />
    </a>
);
