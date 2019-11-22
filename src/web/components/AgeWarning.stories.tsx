import React from 'react';

import { AgeWarning } from './AgeWarning';

/* tslint:disable */
export default {
    component: AgeWarning,
    title: 'Components/AgeWarning',
};
/* tslint:enable */

export const defaultStory = () => {
    return <AgeWarning age="10 years old" />;
};
defaultStory.story = { name: 'default' };

export const SmallWarning = () => {
    return <AgeWarning age="5 months old" size="small" />;
};
SmallWarning.story = { name: 'with size set to small' };

export const ScreenReaderVersion = () => {
    return <AgeWarning age="20 million years old" isScreenReader={true} />;
};
ScreenReaderVersion.story = { name: 'with screen reader true (invisible)' };
