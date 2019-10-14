import React from 'react';
import { Article } from '../pages/Article';
import { ErrorBoundary } from './lib/ErrorBoundary';

export const App = (props: any) => {
    return (
        <ErrorBoundary>
            <Article {...props} />
        </ErrorBoundary>
    );
};
