import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    NAV: NavType;
};

export const DecideLayout = ({ designType, CAPI, NAV }: Props) => {
    const layoutType = hasShowcase(CAPI.mainMediaElements)
        ? 'Showcase'
        : 'Standard';

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} NAV={NAV} layoutType={layoutType} />,
    );

    return designTypeContent[designType];
};
