export const designTypes: DesignType[] = [
    'Article',
    'Immersive',
    'Media',
    'Review',
    'Analysis',
    'Comment',
    'Feature',
    'Live',
    'SpecialReport',
    'Recipe',
    'MatchReport',
    'Interview',
    'GuardianView',
    'GuardianLabs',
    'Quiz',
    'AdvertisementFeature',
];

// Return an object of all designTypes that uses the defaultVal
// Useful for extending overrides
export const designTypeDefault = (defaultVal: any) =>
    designTypes.reduce(
        (prev, curr) =>
            ({ ...prev, [curr]: defaultVal,}),
        {} as DesignTypesObj,
    );
