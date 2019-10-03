import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import {
    desktop,
    tablet,
    leftCol,
    wide,
    phablet,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { BigNumber } from '@guardian/guui';
import { namedAdSlotParameters } from '@frontend/model/advertisement';
import { AdSlot } from '@frontend/web/components/AdSlot';

import { callApi } from '../lib/api';

const container = css`
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }
`;

const mostPopularBody = css`
    ${desktop} {
        display: flex;
        justify-content: space-between;
    }
`;

const heading = css`
    ${headline(4)};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
        ${headline(3)};
        width: 140px;
        position: relative;

        :after {
            content: '';
            display: block;
            position: absolute;
            height: 30px;
            width: 1px;
            background-color: ${palette.neutral[86]};
            right: -11px;
            top: -6px;
        }
    }

    ${wide} {
        width: 220px;
    }
`;

const listContainer = css`
    max-width: 460px;

    ${leftCol} {
        margin-left: 160px;
    }

    ${wide} {
        margin-left: 230px;
    }
`;

const list = css`
    margin-top: 12px;

    ${tablet} {
        border-top: 1px solid ${palette.neutral[86]};
        width: 620px;
        min-height: 300px;
        column-width: 300px;
        column-gap: 20px;
        column-fill: balance;
        column-count: 2;
    }
`;

const hideList = css`
    display: none;
`;

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${palette.neutral[86]};
    }

    :first-of-type {
        &:before {
            display: none;
        }
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    ${tablet} {
        padding-top: 3px;
        padding-bottom: 0;
        min-height: 72px;
    }

    ${desktop} {
        height: 100%;
        display: inline-block;
        width: 100%;

        :nth-of-type(6) {
            &:before {
                display: none;
            }
        }
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    margin-top: -4px;
    margin-left: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline(2)};
`;

const tabsContainer = css`
    border-bottom: 1px solid ${palette.neutral[86]};

    &::after {
        content: '';
        display: block;
        clear: left;

        ${tablet} {
            display: none;
        }
    }

    ${tablet} {
        border-bottom: 0;
    }
`;

const listTab = css`
    width: 50%;
    float: left;
    border-top: 3px solid ${palette.neutral[93]};
    background-color: ${palette.neutral[93]};

    ${phablet} {
        width: 230px;
    }
`;

const selectedListTab = css`
    background-color: ${palette.neutral[100]};
`;

const tabButton = css`
    ${headline(1)};
    margin: 0;
    border: 0;
    background: transparent;
    padding-left: 10px;
    padding-right: 6px;
    padding-top: 4px;
    text-align: left;
    text-decoration: none;
    font-weight: 600;
    min-height: 36px;
    display: block;
    width: 100%;

    &:hover {
        cursor: pointer;
    }

    ${tablet} {
        ${headline(2)};
    }
`;

const liveKicker = css`
    color: ${palette.news.main};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

interface Trail {
    url: string;
    linkText: string;
    isLiveBlog: boolean;
}

interface Tab {
    heading: string;
    trails: Trail[];
}

const buildSectionUrl = (sectionName?: string) => {
    const sectionsWithoutPopular = ['info', 'global'];
    const hasSection =
        sectionName && !sectionsWithoutPopular.includes(sectionName);
    const endpoint = `/most-read${hasSection ? `/${sectionName}` : ''}.json`;

    return `https://api.nextgen.guardianapps.co.uk${endpoint}?dcr=true`;
};

interface Props {
    sectionName?: string;
    config: ConfigType;
}

export const MostViewed = ({ sectionName, config }: Props) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        callApi(buildSectionUrl(sectionName))
            .then(data => {
                setData(data);
            })
            .catch(err => {
                window.guardian.modules.raven.reportError(
                    err,
                    {
                        feature: 'most-viewed',
                    },
                    true,
                );

                return [];
            });
    }, [sectionName]);

    return (
        <div
            className={container}
            data-link-name={'most-viewed'}
            data-component={'most-viewed'}
        >
            <h2 className={heading}>Most popular</h2>
            <div className={mostPopularBody}>
                <div className={listContainer}>
                    {Array.isArray(data) && data.length > 1 && (
                        <ul className={tabsContainer} role="tablist">
                            {(data || []).map((tab: Tab, i: number) => (
                                <li
                                    className={cx(listTab, {
                                        [selectedListTab]:
                                            i === selectedTabIndex,
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
                    {(data || []).map((tab, i) => (
                        <ol
                            className={cx(list, {
                                [hideList]: i !== selectedTabIndex,
                            })}
                            id={`tabs-popular-${i}`}
                            key={`tabs-popular-${i}`}
                            role="tabpanel"
                            aria-labelledby={`tabs-popular-${i}-tab`}
                            data-link-name={tab.heading}
                            data-testid={tab.heading}
                            data-link-context={`most-read/${sectionName}`}
                        >
                            {(tab.trails || []).map(
                                (trail: Trail, ii: number) => (
                                    <li
                                        className={listItem}
                                        key={trail.url}
                                        data-link-name={`${ii + 1} | text`}
                                    >
                                        <span className={bigNumber}>
                                            <BigNumber index={ii + 1} />
                                        </span>
                                        <h2 className={headlineHeader}>
                                            <a
                                                className={headlineLink}
                                                href={trail.url}
                                                data-link-name={'article'}
                                            >
                                                {trail.isLiveBlog && (
                                                    <span
                                                        className={liveKicker}
                                                    >
                                                        Live
                                                    </span>
                                                )}
                                                {trail.linkText}
                                            </a>
                                        </h2>
                                    </li>
                                ),
                            )}
                        </ol>
                    ))}
                </div>
                )}
                <AdSlot
                    asps={namedAdSlotParameters('most-popular')}
                    config={config}
                    className={''}
                />
            </div>
        </div>
    );
};
