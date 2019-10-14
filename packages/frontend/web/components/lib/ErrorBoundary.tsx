import React, { Component } from 'react';
import { reportError } from '../../browser/sentry/errors';

export class ErrorBoundary extends Component<{}, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    public getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: any) {
        // console.info('ErrorBoundary componentDidCatch');
        reportError(error);
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
