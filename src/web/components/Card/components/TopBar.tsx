import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

type Props = {
    children: JSXElements;
};

const topBarStyles = (topbarColour: string) => css`
    display: flex;
    width: 100%;

    /* We absolutely position the 1 pixel top bar below
so this is required here */
    position: relative;

    /* Styling for top bar */
    :before {
        background-color: ${topbarColour};
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        z-index: 2;
    }
`;

export const TopBar = ({ children }: Props) => {
    const theme = useTheme<ThemeType>();

    return (
        <div className={topBarStyles(theme.card.topbarColour)}>{children}</div>
    );
};
