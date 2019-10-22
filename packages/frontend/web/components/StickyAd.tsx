import React from 'react';
import { css } from 'emotion';

import { AdSlot } from '@frontend/web/components/AdSlot';
import { namedAdSlotParameters } from '@frontend/model/advertisement';

const adSlotWrapper = css`
    position: static;
    height: 1059px;
`;

const stickyAdSlot = css`
    position: sticky;
    top: 0;
`;

type Props = {
    config: ConfigType;
};

export const StickyAd = ({ config }: Props) => (
    <div className={adSlotWrapper}>
        <AdSlot
            asps={namedAdSlotParameters('right')}
            config={config}
            className={stickyAdSlot}
        />
    </div>
);