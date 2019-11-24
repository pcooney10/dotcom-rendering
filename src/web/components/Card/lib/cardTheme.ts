import { palette } from '@guardian/src-foundations';

export const getCardTheme = ({
    designType,
    pillar,
}: {
    designType: DesignType;
    pillar: Pillar;
}) => {
    const cardDefaults = {
        topbarColour: palette[pillar].main,
        backgroundColour: palette.neutral[97],
        backgroundOnHover: palette.neutral[93],
        fontColour: palette.neutral[7], // black
        headlineColour: palette.neutral[7], // black
        headlineUnderlined: false,
        ageColour: palette.neutral[46],
        clockColour: palette.neutral[60],
    };

    const kickerDefaults = {
        colour: palette[pillar].main,
    };

    switch (designType) {
        case 'Live':
            return {
                card: {
                    ...cardDefaults,
                    backgroundColour: palette.news.main,
                    backgroundOnHover: palette.news.dark,
                    fontColour: palette.neutral[100], // white
                    headlineColour: palette.neutral[100], // white
                    ageColour: palette.neutral[100], // white
                    clockColour: palette.neutral[100], // white
                },
                kicker: {
                    ...kickerDefaults,
                    colour: palette[pillar].main, // TODO Should be bright but this isn't available
                },
            };
        case 'Media':
            return {
                card: {
                    ...cardDefaults,
                    backgroundColour: palette.neutral[7],
                    backgroundOnHover: palette.neutral[20],
                    fontColour: palette.neutral[100], // white
                    headlineColour: palette.neutral[100], // white
                    ageColour: palette.neutral[100], // white
                    clockColour: palette.neutral[100], // white
                },
                kicker: {
                    ...kickerDefaults,
                    colour: palette[pillar].main, // TODO Should be bright but this isn't available
                },
            };
        case 'Analysis':
            return {
                card: {
                    ...cardDefaults,
                    headlineUnderlined: true,
                },
                kicker: {
                    ...kickerDefaults,
                },
            };
        case 'Feature':
            return {
                card: {
                    ...cardDefaults,
                    headlineColour: palette[pillar].dark,
                },
                kicker: {
                    ...kickerDefaults,
                },
            };
        case 'Article':
        case 'Immersive':
        case 'Review':
        case 'Comment':
        case 'SpecialReport':
        case 'Recipe':
        case 'MatchReport':
        case 'Interview':
        case 'GuardianView':
        case 'GuardianLabs':
        case 'Quiz':
        case 'AdvertisementFeature':
        default:
            return {
                card: {
                    ...cardDefaults,
                },
                kicker: {
                    ...kickerDefaults,
                },
            };
    }
};
