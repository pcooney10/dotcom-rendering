import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import { unescapeData } from '@root/src/lib/escapeData';

// fallback styling for when JS is disabled
const noJSStyling = css`
    .twitter-tweet :not(.twitter-tweet-rendered) {
        border: 1px solid ${palette.neutral[86]};
        border-radius: 4px;
        padding: 20px;
        width: 100%;
        margin-bottom: 16px;
        ${body.small()};
    }

    .twitter-tweet p {
        padding-bottom: 10px;
    }

    a {
        /* stylelint-disable-next-line color-no-hex */
        color: #2b7bb9;
    }
`;

// tslint:disable:react-no-dangerous-html
export const TweetBlockComponent: React.FC<{
    element: TweetBlockElement;
}> = ({ element }) => {
    return (
        <div>
            <div
                className={noJSStyling}
                dangerouslySetInnerHTML={{ __html: unescapeData(element.html) }}
            />
            <script
                async={true}
                src="https://platform.twitter.com/widgets.js"
            />
        </div>
    );
};
