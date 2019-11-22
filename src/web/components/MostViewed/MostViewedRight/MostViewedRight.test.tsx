import React from 'react';
import { render } from '@testing-library/react';
import { MostViewedRight } from './MostViewedRight';
import { response } from './MostViewedRight.mocks';

import { useApi as useApi_ } from '../../lib/api';

const useApi: any = useApi_;

jest.mock('../../lib/api', () => ({
    useApi: jest.fn(),
}));

describe('MostViewedList', () => {
    beforeEach(() => {
        useApi.mockReset();
    });
    it('should call the api and render the response as expected', () => {
        useApi.mockReturnValue(response);

        const { getAllByText } = render(<MostViewedRight />);

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders no more than 5 items
        expect(getAllByText(/LINKTEXT/).length).toBe(5);

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(3);

        // Renders appropriate number of age warnins
        expect(getAllByText(/This article is more than/).length).toBe(2);
    });

    it('should implement a limit on the number of items', () => {
        useApi.mockReturnValue(response);

        const { getAllByText } = render(<MostViewedRight limitItems={3} />);

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders no more than 3 items
        expect(getAllByText(/LINKTEXT/).length).toBe(3);

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(2);

        // Renders appropriate number of age warnins
        expect(getAllByText(/This article is more than/).length).toBe(1);
    });
});
