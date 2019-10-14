export const reportError = (error: any, feature?: string) => {
    import('./sentry').then(({ logError }) => {
        logError(error, feature);
    });
};
