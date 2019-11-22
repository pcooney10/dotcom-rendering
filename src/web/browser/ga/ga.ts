import { getCookie } from './cookie';

interface TrackerConfig {
    name: string;
    id: string;
    sampleRate: number;
    siteSpeedSampleRate: number;
}

const tracker: TrackerConfig = {
    name: 'allEditorialPropertyTracker',
    id: 'UA-78705427-1',
    sampleRate: 100,
    siteSpeedSampleRate: 100, // TODO Should be set to 1 when rolling out to wider audience
};

const getQueryParam = (
    key: string,
    queryString: string,
): string | undefined => {
    const params = queryString.substring(1).split('&');
    const pairs = params.map(x => x.split('='));

    return pairs
        .filter(xs => xs.length === 2 && xs[0] === key)
        .map(xs => xs[1])[0];
};

export const init = (): void => {
    const coldQueue = (...args: any[]) => {
        (window.ga.q = window.ga.q || []).push(args);
    };

    window.ga = window.ga || (coldQueue as UniversalAnalytics.ga);
    const identityId = getCookie('GU_U');

    window.GoogleAnalyticsObject = 'ga';
    window.ga.l = +new Date();

    window.ga('create', tracker.id, 'auto', tracker.name, {
        sampleRate: tracker.sampleRate,
        siteSpeedSampleRate: tracker.siteSpeedSampleRate,
        userId: identityId,
    });
};

export const sendPageView = (): void => {
    const { GA } = window.guardian.app.data;
    const set = `${tracker.name}.set`;
    const send = `${tracker.name}.send`;
    const identityId = getCookie('GU_U');
    const {ga} = window;

    ga(set, 'forceSSL', true);
    ga(set, 'title', GA.webTitle);
    ga(set, 'anonymizeIp', true);
    /** *************************************************************************************
     * Custom dimensions common to all platforms across the whole Guardian estate          *
     ************************************************************************************** */
    ga(set, 'dimension3', 'theguardian.com'); /* Platform */
    /** *************************************************************************************
     * Custom dimensions for 'editorial' platforms (this site, the mobile apps, etc.)      *
     * Some of these will be undefined for non-content pages, but that's fine.             *
     ************************************************************************************** */
    ga(set, 'dimension4', GA.section);
    ga(set, 'dimension5', GA.contentType);
    ga(set, 'dimension6', GA.commissioningDesks);
    ga(set, 'dimension7', GA.contentId);
    ga(set, 'dimension8', GA.authorIds);
    ga(set, 'dimension9', GA.keywordIds);
    ga(set, 'dimension10', GA.toneIds);
    ga(set, 'dimension11', GA.seriesId);
    ga(set, 'dimension15', identityId);
    ga(set, 'dimension16', (identityId && 'true') || 'false');
    ga(set, 'dimension21', getQueryParam('INTCMP', window.location.search)); // internal campaign code
    ga(set, 'dimension22', getQueryParam('CMP_BUNIT', window.location.search)); // campaign business unit
    ga(set, 'dimension23', getQueryParam('CMP_TU', window.location.search)); // campaign team
    ga(set, 'dimension26', GA.isHosted);
    ga(set, 'dimension27', navigator.userAgent); // I bet you a pint
    ga(set, 'dimension29', window.location.href); // That both of these are already tracked.
    ga(set, 'dimension30', GA.edition);

    // TODO: sponsor logos
    // ga(set, 'dimension31', GA.sponsorLogos);

    // TODO: commercial branding
    // ga(set, 'dimension42', 'GA.brandingType');

    ga(set, 'dimension43', 'dotcom-rendering');
    ga(set, 'dimension50', GA.pillar);

    if (window.location.hash === '#fbLogin') {
        ga(set, 'referrer', null);
        window.location.hash = '';
    }

    try {
        const NG_STORAGE_KEY = 'gu.analytics.referrerVars';
        const referrerVarsData = window.sessionStorage.getItem(NG_STORAGE_KEY);
        const referrerVars = JSON.parse(referrerVarsData || '""');
        if (referrerVars && referrerVars.value) {
            const d = new Date().getTime();
            if (d - referrerVars.value.time < 60 * 1000) {
                // One minute
                ga(send, 'event', 'Click', 'Internal', referrerVars.value.tag, {
                    nonInteraction: true, // to avoid affecting bounce rate
                    dimension12: referrerVars.value.path,
                });
            }
            window.sessionStorage.removeItem(NG_STORAGE_KEY);
        }
    } catch (e) {
        // do nothing
    }

    ga(send, 'pageview', {
        hitCallback() {
            const image = new Image();
            image.src = `${GA.beaconUrl}/count/pvg.gif`;
        },
    });
};
