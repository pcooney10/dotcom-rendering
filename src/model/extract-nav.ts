import get from 'lodash.get';
import { findPillar } from './find-pillar';

const getString = (
    obj: object,
    selector: string,
    fallbackValue?: string,
): string => {
    const found = get(obj, selector);
    if (typeof found === 'string') {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getArray = <T>(
    obj: object,
    selector: string,
    fallbackValue?: T[],
): T[] => {
    const found = get(obj, selector);

    if (Array.isArray(found)) {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected array at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getLink = (data: {}, { isPillar }: { isPillar: boolean }): LinkType => {
    const title = getString(data, 'title');
    return {
        title,
        longTitle: getString(data, 'longTitle') || title,
        url: getString(data, 'url'),
        pillar: isPillar ? findPillar(getString(data, 'title')) : undefined,
        children: getArray<object>(data, 'children', []).map(
            l => getLink(l, { isPillar: false }), // children are never pillars
        ),
        mobileOnly: false,
    };
};

const rrLinkConfig = 'readerRevenueLinks';
const buildRRLinkCategories = (
    data: {},
    position: ReaderRevenuePosition,
): ReaderRevenueCategories => ({
    subscribe: getString(data, `${rrLinkConfig}.${position}.subscribe`, ''),
    support: getString(data, `${rrLinkConfig}.${position}.support`, ''),
    contribute: getString(data, `${rrLinkConfig}.${position}.contribute`, ''),
});

const buildRRLinkModel = (data: {}): ReaderRevenuePositions => ({
    header: buildRRLinkCategories(data, 'header'),
    footer: buildRRLinkCategories(data, 'footer'),
    sideMenu: buildRRLinkCategories(data, 'sideMenu'),
    ampHeader: buildRRLinkCategories(data, 'ampHeader'),
    ampFooter: buildRRLinkCategories(data, 'ampFooter'),
});

export const extract = (data: {}): NavType => {
    let pillars = getArray<any>(data, 'pillars');

    pillars = pillars.map(link => getLink(link, { isPillar: true }));

    const subnav = get(data, 'subNavSections');

    return {
        pillars,
        otherLinks: {
            url: '', // unused
            title: 'More',
            longTitle: 'More',
            more: true,
            children: getArray<object>(data, 'otherLinks', []).map(l =>
                getLink(l, { isPillar: false }),
            ),
        },
        brandExtensions: getArray<object>(data, 'brandExtensions', []).map(l =>
            getLink(l, { isPillar: false }),
        ),
        currentNavLink: getString(data, 'currentNavLink.title', ''),
        subNavSections: subnav
            ? {
                  parent: subnav.parent
                      ? getLink(subnav.parent, { isPillar: false })
                      : undefined,
                  links: getArray<object>(subnav, 'links').map(l =>
                      getLink(l, { isPillar: false }),
                  ),
              }
            : undefined,
        readerRevenueLinks: buildRRLinkModel(data),
    };
};
