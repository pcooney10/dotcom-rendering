// @flow
import styled from 'preact-emotion';

import { clearFix } from 'pasteup/mixins';
import { tablet, desktop, leftCol, wide } from 'pasteup/breakpoints';

import Logo from './Logo';
import Links from './Links';
import Pillars from './Pillars';

const Nav = styled('nav')(
    {
        [tablet]: {
            maxWidth: '740px',
        },
        [desktop]: {
            maxWidth: '980px',
        },
        [leftCol]: {
            maxWidth: '1140px',
        },
        [wide]: {
            maxWidth: '1300px',
        },
        position: 'relative',
        margin: '0 auto',
    },
    clearFix,
);
Nav.displayName = 'Nav';

export default () => (
    <Nav>
        <Logo href="/" />
        <Links />
        <Pillars />
    </Nav>
);

// const MenuLabel = styled('label')({
//     [until.desktop]: {
//         position: 'absolute',
//         right: '5px',
//         top: '24px',
//     },
//     [from.mobileMedium.until.desktop]: {
//         bottom: '-6px',
//         top: 'auto',
//     },
//     [from.mobileLandscape.until.desktop]: {
//         right: '46px',
//     },
//     ':focus': {
//         outline: 0,
//     },
// });
// <MenuLabel htmlFor="main-menu-toggle" />