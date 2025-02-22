import * as Sentry from '@sentry/browser';

// This is set to 10% here rather than the normal 1% so we get good
// feedback early on. TODO: This should be reduced to 1% once the site is fully deployed.
const SAMPLE_RATE = 0.1;

// Only send errors matching these regexes
const whitelistUrls = [
    /webpack-internal/,
    /localhost/,
    /assets\.guim\.co\.uk/,
    /ophan\.co\.uk/,
];

// Ignore these errors
const ignoreErrors = [
    // https://docs.sentry.io/platforms/javascript/#decluttering-sentry
    "Can't execute code from a freed script",
    /InvalidStateError/gi,
    /Fetch error:/gi,
    'Network request failed',
    'This video is no longer available.',
    'UnknownError',
];

export const initialiseSentry = (adBlockInUse: boolean) => {
    const {
        editionLongForm,
        contentType,
        config: {
            isDev,
            switches: { enableSentryReporting },
            dcrSentryDsn,
        },
    } = window.guardian.app.data.CAPI;

    Sentry.init({
        ignoreErrors,
        whitelistUrls,
        dsn: dcrSentryDsn,
        environment: window.guardian.config.stage || 'DEV',
        sampleRate: SAMPLE_RATE,
        beforeSend(event) {
            // Skip sending events in certain situations
            const dontSend = adBlockInUse || isDev || !enableSentryReporting;
            if (dontSend) {
                return null;
            }
            return event;
        },
    });

    Sentry.configureScope(scope => {
        scope.setTag('edition', editionLongForm);
        scope.setTag('contentType', contentType);
    });
};

export const reportError = (error: Error, feature?: string): void => {
    Sentry.withScope(() => {
        if (feature) {
            Sentry.setTag('feature', feature);
        }
        Sentry.captureException(error);
    });
};
