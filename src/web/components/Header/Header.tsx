import React, { Component } from 'react';
import { css } from 'emotion';

import { Hide } from '@root/src/web/components/Hide';
import { getCookie } from '@root/src/web/browser/cookie';
import { ReaderRevenueLinks } from '@root/src/web/components/ReaderRevenueLinks';

import { Logo } from './Logo';
import { EditionDropdown } from './EditionDropdown';
import { Links } from './Links/Links';

const headerStyles = css`
    /* Ensure header height contains it's children */
    overflow: auto;
`;

interface Props {
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}

export class Header extends Component<Props, { isSignedIn: boolean }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isSignedIn: false,
        };
    }

    public componentDidMount() {
        this.setState({
            isSignedIn: !!getCookie('GU_U'),
        });
    }

    public render() {
        const { nav, edition } = this.props;
        const { isSignedIn } = this.state;

        return (
            <header className={headerStyles}>
                <Hide when="below" breakpoint="desktop">
                    <EditionDropdown
                        edition={edition}
                        dataLinkName={'nav2 : topbar : edition-picker: toggle'}
                    />
                </Hide>
                <Logo />
                {/*
                        TODO: The properties of the Links component
                        have been hardcoded to false. At some point
                        these need to be dynamic.
                    */}

                <ReaderRevenueLinks
                    urls={nav.readerRevenueLinks.header}
                    edition={edition}
                    dataLinkNamePrefix={'nav2 : '}
                    noResponsive={false}
                    inHeader={true}
                />
                <Links isSignedIn={isSignedIn} />
            </header>
        );
    }
}