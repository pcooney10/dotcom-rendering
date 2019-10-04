import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { desktop, tablet, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot } from '@frontend/web/components/AdSlot';
import { TrailItem } from './TrailItem';

import { useApi } from '../lib/api';

const thinGreySolid = `1px solid ${palette.neutral[86]}`;

const flexContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const mostPopularBody = css`
    ${desktop} {
        display: flex;
        flex-direction: column;
    }
`;

const heading = css`
    ${headline(4)};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 4px;
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }

    ${leftCol} {
        ${headline(3)};
        width: 140px;
        position: relative;
    }

    ${wide} {
        width: 454px;
    }
`;

const listContainer = css`
    max-width: 60rem;
    border-left: ${thinGreySolid};
    border-right: ${thinGreySolid};
`;

const tabsContainer = css`
    display: flex;
    position: relative;
    border-bottom: ${thinGreySolid};

    ${tablet} {
        border-bottom: 0;
    }
`;

const listTab = css`
    font-weight: 700;
    line-height: 1.1;
    background-color: transparent;
    text-transform: capitalize;
    padding: 8px 0.625rem 0;
    margin-bottom: 16px;
`;

const firstTab = css`
    border-right: ${thinGreySolid};
`;

const selectedListTab = css`
    /* TODO: Using a pseudo selector here could be faster? */
    box-shadow: inset 0px 4px 0px 0px ${palette.news.main};
    transition: box-shadow 0.3s ease-in-out;
`;

const unselectedListTab = css`
    &:hover {
        box-shadow: inset 0px 4px 0px 0px ${palette.neutral[86]};
        transition: box-shadow 0.3s ease-in-out;
    }
`;

const tabButton = css`
    ${headline(1)};
    margin: 0;
    border: 0;
    background: transparent;
    text-decoration: none;
    font-weight: 600;
    display: block;
    width: 100%;

    &:hover {
        cursor: pointer;
    }

    ${tablet} {
        ${headline(2)};
    }
`;

export interface TrailType {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
}

interface TabType {
    heading: string;
    trails: TrailType[];
}

const adSpacing = css`
    margin: 0.375rem 0 0 0.625rem;
`;

const hideList = css`
    display: none;
`;

const gridContainer = css`
    /* We're using grid to layout the most viewed list here.
    By choosing grid-auto-flow: column; we don't need any grid item css and
    the defaults should just work. */
    display: grid;
    grid-auto-flow: column;

    /* One column view */
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

    /* Two column view */
    ${tablet} {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto auto auto;
    }

    /* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
    border-left: ${thinGreySolid};
`;

interface Props {
    sectionName?: string;
    config: ConfigType;
}

export const MostViewed = ({ sectionName, config }: Props) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    function buildSectionUrl(sectionName?: string) {
        const sectionsWithoutPopular = ['info', 'global'];
        const hasSection =
            sectionName && !sectionsWithoutPopular.includes(sectionName);
        const endpoint = `/most-read${
            hasSection ? `/${sectionName}` : ''
        }.json`;

        return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
    }

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
            <h2 className={heading}>Most popular</h2>
            <div className={mostPopularBody}>
                <div className={listContainer}>
                    {data && data.length > 1 && (
                        <ul className={tabsContainer} role="tablist">
                            {data.map((tab: TabType, i: number) => (
                                <li
                                    className={cx(listTab, {
                                        [selectedListTab]:
                                            i === selectedTabIndex,
                                        [unselectedListTab]:
                                            i !== selectedTabIndex,
                                        [firstTab]: i === 0,
                                    })}
                                    role="tab"
                                    aria-selected={i === selectedTabIndex}
                                    aria-controls={`tabs-popular-${i}`}
                                    id={`tabs-popular-${i}-tab`}
                                    key={`tabs-popular-${i}-tab`}
                                >
                                    <button
                                        className={tabButton}
                                        onClick={() => setSelectedTabIndex(i)}
                                    >
                                        <span
                                            className={css`
                                                ${screenReaderOnly};
                                            `}
                                        >
                                            Most viewed{' '}
                                        </span>
                                        <span // tslint:disable-line:react-no-dangerous-html
                                            // "Across The Guardian" has a non-breaking space entity between "The" and "Guardian"
                                            dangerouslySetInnerHTML={{
                                                __html: tab.heading,
                                            }}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    {data &&
                        data.map(({ trails, heading }, i: number) => (
                            <ol
                                className={cx(gridContainer, {
                                    [hideList]: i !== selectedTabIndex,
                                })}
                                id={`tabs-popular-${i}`}
                                key={`tabs-popular-${i}`}
                                role="tabpanel"
                                aria-labelledby={`tabs-popular-${i}-tab`}
                                data-link-name={heading}
                                data-testid={heading}
                                data-link-context={`most-read/${sectionName}`}
                            >
                                <TrailItem trail={trails[0]} position={1} />
                                <TrailItem trail={trails[1]} position={2} />
                                <TrailItem trail={trails[2]} position={3} />
                                <TrailItem trail={trails[3]} position={4} />
                                <TrailItem trail={trails[4]} position={5} />
                                <TrailItem trail={trails[5]} position={6} />
                                <TrailItem trail={trails[6]} position={7} />
                                <TrailItem trail={trails[7]} position={8} />
                                <TrailItem trail={trails[8]} position={9} />
                                <TrailItem trail={trails[9]} position={10} />
                            </ol>
                        ))}
                </div>
            </div>
            <div className={adSpacing}>
                <AdSlot
                    asps={namedAdSlotParameters('most-popular')}
                    config={config}
                    className={''}
                />
            </div>
        </div>
    );
};
