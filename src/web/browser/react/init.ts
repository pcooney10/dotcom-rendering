import { hydrate as hydrateCSS } from 'emotion';
import { startup } from '@root/src/web/browser/startup';

import { hydrateIslands } from '@frontend/web/islands/islands';

const init = (): Promise<void> => {
    const {
        cssIDs,
        data: { CAPI, NAV },
    } = window.guardian.app;

    /**
     * TODO: Remove conditional when Emotion's issue is resolved.
     * We're having to prevent emotion hydrating styles in the browser
     * in development mode to retain the sourceMap info. As detailed
     * in the issue raised here https://github.com/emotion-js/emotion/issues/487
     */
    if (process.env.NODE_ENV !== 'development') {
        hydrateCSS(cssIDs);
    }

    hydrateIslands(CAPI, NAV);

    return Promise.resolve();
};

// TODO remove this
if (module.hot) {
    module.hot.accept();
}

startup('react', null, init);
