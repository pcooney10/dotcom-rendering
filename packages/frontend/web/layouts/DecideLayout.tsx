import React from 'react';
import { designTypeDefault } from '@frontend/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
    theme: ThemeType;
};

export const DecideLayout = ({
    designType,
    CAPI,
    config,
    NAV,
    theme,
}: Props) => {
    // TODO: theme - This is an object of style properties that should be used in place
    // of local logic to decide how to style components. We need a method to pass it down
    // into components
    if (hasShowcase(CAPI.mainMediaElements)) {
        return <ShowcaseLayout CAPI={CAPI} config={config} NAV={NAV} />;
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} config={config} NAV={NAV} />,
    );

    return designTypeContent[designType];
};
