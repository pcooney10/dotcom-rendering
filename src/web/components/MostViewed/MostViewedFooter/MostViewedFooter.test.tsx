import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MostViewedFooter } from './MostViewedFooter';
import {
    responseWithTwoTabs,
    responseWithOneTab,
} from './MostViewedFooter.mocks';

import { useApi as useApi_ } from '../../lib/api';

const useApi: any = useApi_;

jest.mock('../../lib/api', () => ({
    useApi: jest.fn(),
}));

const VISIBLE = 'display: grid';
const HIDDEN = 'display: none';

describe('MostViewedFooter', () => {
    beforeEach(() => {
        useApi.mockReset();
    });

    it('should call the api and render the response as expected', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { getByText, getAllByText, getByTestId } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders all 20 items
        expect(getAllByText(/LINKTEXT/).length).toBe(20);

        // First tab defaults to visible
        expect(getByTestId(responseWithTwoTabs.tabs[0].heading)).toHaveStyle(
            VISIBLE,
        );

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(3);

        // Renders appropriate number of age warnins
        expect(getAllByText(/This article is more than/).length).toBe(3);

        // Handles &nbsp char
        expect(getByText('Across The Guardian')).toBeInTheDocument();
    });

    it('should change the items shown when the associated tab is clicked', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { getByTestId, getByText } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        const firstHeading = responseWithTwoTabs.tabs[0].heading;
        const secondHeading = responseWithTwoTabs.tabs[1].heading;

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);

        fireEvent.click(getByText(secondHeading));

        expect(getByTestId(firstHeading)).toHaveStyle(HIDDEN);
        expect(getByTestId(secondHeading)).toHaveStyle(VISIBLE);

        // Hardcode this text here because the actual raw data contains $nbsp; which is removed during rendering
        fireEvent.click(getByText('Across The Guardian'));

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);
    });

    it('should not show the tab menu when there is only one group of tabs', async () => {
        useApi.mockReturnValue({ data: responseWithOneTab });

        const { queryByText } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        expect(
            queryByText(responseWithOneTab.tabs[0].heading),
        ).not.toBeInTheDocument();
    });

    // TODO: Restore this once the component has this feature added to it
    it.skip('should show a byline when this property is set to true', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { getByText } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        expect(
            getByText(responseWithTwoTabs.tabs[0].trails[9].byline),
        ).toBeInTheDocument();
    });

    it("should display the text 'Live' for live blogs", () => {
        useApi.mockReturnValue({
            data: [
                {
                    heading: 'Section header',
                    trails: [
                        {
                            url: '',
                            headline: 'Headline',
                            showByline: false,
                            byline: '',
                            image: '',
                            isLiveBlog: true,
                            pillar: 'news',
                        },
                    ],
                },
            ],
        });

        const { getByText } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        expect(getByText('Live')).toBeInTheDocument();
    });

    it("should NOT display the text 'Live' when isLiveBlog is false", () => {
        useApi.mockReturnValue({
            data: [
                {
                    heading: 'Section header',
                    trails: [
                        {
                            url: '',
                            headline: 'Headline',
                            showByline: false,
                            byline: '',
                            image: '',
                            isLiveBlog: false,
                            pillar: 'news',
                        },
                    ],
                },
            ],
        });

        const { queryByText } = render(
            <MostViewedFooter sectionName="Section Name" pillar="news" />,
        );

        expect(queryByText('Live')).not.toBeInTheDocument();
    });
});
