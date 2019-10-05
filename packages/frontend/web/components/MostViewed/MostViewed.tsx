import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot } from '@frontend/web/components/AdSlot';

import { Trails } from './Trails';

import { useApi } from '../lib/api';

const flexContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${desktop} {
        flex-direction: column;
    }

    ${leftCol} {
        flex-direction: row;
    }
`;

const asideStyles = css`
    ${leftCol} {
        width: 150px;
    }

    ${wide} {
        width: 230px;
    }
`;

const contentStyles = css`
    display: flex;
    flex-direction: column;

    ${desktop} {
        flex-direction: row;
    }
`;

const adStyles = css`
    margin: 0.375rem 0 0 0.625rem;
`;

const headingStyles = css`
    ${headline(4)};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 14px;
    padding-top: 3px;

    ${leftCol} {
        ${headline(3)};
        width: 353px;
    }

    ${wide} {
        width: 484px;
    }
`;

export interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
}

interface Props {
    sectionName?: string;
    config: ConfigType;
    pillar: Pillar;
}

function buildSectionUrl(sectionName?: string) {
    const sectionsWithoutPopular = ['info', 'global'];
    const hasSection =
        sectionName && !sectionsWithoutPopular.includes(sectionName);
    const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;

    return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
}

export const MostViewed = ({ sectionName, config, pillar }: Props) => {
    const url = buildSectionUrl(sectionName);
    const { data, error } = useApi(url);

    if (error) {
        window.guardian.modules.raven.reportError(
            error,
            {
                feature: 'most-viewed',
            },
            true,
        );
    }

    return (
        <div
            className={flexContainer}
            data-link-name={'most-viewed'}
            data-component={'most-viewed'}
        >
            <section className={asideStyles}>
                <h2 className={headingStyles}>Most popular</h2>
            </section>
            <section className={contentStyles}>
                <Trails data={data} sectionName={sectionName} pillar={pillar} />
                <div className={adStyles}>
                    <AdSlot
                        asps={namedAdSlotParameters('most-popular')}
                        config={config}
                        className={''}
                    />
                </div>
            </section>
        </div>
    );
};
