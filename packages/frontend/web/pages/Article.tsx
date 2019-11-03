import React from 'react';

import { DecideLayout } from '../layouts/DecideLayout';
import { decideTheme } from '../theme/theme';

export const Article: React.FC<{
    data: ArticleProps;
}> = ({ data }) => {
    const theme = decideTheme({
        // TODO: Extend these suggested props
        // designType: data.CAPI.designType,
        // edition: data.CAPI.editionId,
        // isImmersive: data.CAPI.isImmersive,
        // pillar: data.CAPI.pillar,
    });

    return (
        <DecideLayout
            designType={data.CAPI.designType}
            CAPI={data.CAPI}
            config={data.config}
            NAV={data.NAV}
            theme={theme}
        />
    );
};
