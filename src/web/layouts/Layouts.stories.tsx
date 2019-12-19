import React from 'react';

import CAPI from './__mocks__/CAPI.json';
import NAV from './__mocks__/NAV.json';

import { StandardLayout } from './StandardLayout';

/* tslint:disable */
export default {
    component: StandardLayout,
    title: 'Layouts/Standard',
    parameters: {
        percy: { widths: [600, 979, 1139, 1299, 1400] },
    },
};
/* tslint:enable */

export const Standard = () => (
    <StandardLayout
        // @ts-ignore
        CAPI={CAPI}
        NAV={NAV as NavType}
        layoutType="Standard"
    />
);
Standard.story = { name: 'Standard' };

export const Showcase = () => (
    <StandardLayout
        // @ts-ignore
        CAPI={CAPI}
        NAV={NAV as NavType}
        layoutType="Showcase"
    />
);
Showcase.story = { name: 'Showcase' };
