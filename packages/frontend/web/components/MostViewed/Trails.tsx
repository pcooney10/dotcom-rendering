import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import { tablet, leftCol } from '@guardian/pasteup/breakpoints';
import { pillarPalette } from '@frontend/lib/pillars';

import { screenReaderOnly } from '@guardian/pasteup/mixins';

import { TrailType } from './MostViewed';
import { TrailItem } from './TrailItem';

const thinGreySolid = `1px solid ${palette.neutral[86]}`;

const listContainer = css`
    border-left: ${thinGreySolid};
    border-right: ${thinGreySolid};
`;

const tabsContainer = css`
    display: flex;
    position: relative;
    border-top: ${thinGreySolid};

    ${leftCol} {
        border-bottom: 0;
        border-top: 0;
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

const selectedListTab = (pillar: Pillar) => css`
    /* TODO: Using a pseudo selector here could be faster? */
    box-shadow: inset 0px 4px 0px 0px ${pillar && pillarPalette[pillar].dark};
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

const hideList = css`
    display: none;
`;

const gridContainer = css`
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
    border-left: 1px solid ${palette.neutral[86]};
`;

interface TabType {
    heading: string;
    trails: TrailType[];
}

type Props = {
    data: any;
    sectionName?: string;
    pillar: Pillar;
};

export const Trails = ({ data, sectionName, pillar }: Props) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <div>
            <div className={listContainer}>
                {data && data.length > 1 && (
                    <ul className={tabsContainer} role="tablist">
                        {data.map((tab: TabType, i: number) => (
                            <li
                                className={cx(listTab, {
                                    [selectedListTab(pillar)]:
                                        i === selectedTabIndex,
                                    [unselectedListTab]: i !== selectedTabIndex,
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
                    data.map(
                        (
                            {
                                trails,
                                heading,
                            }: { trails: TrailType[]; heading: string },
                            i: number,
                        ) => (
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
                        ),
                    )}
            </div>
        </div>
    );
};
