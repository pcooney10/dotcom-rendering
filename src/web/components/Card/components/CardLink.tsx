import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const linkStyles = ({
    backgroundColour,
    backgroundOnHover,
}: {
    backgroundColour: string;
    backgroundOnHover: string;
}) => css`
    display: flex;
    /* a tag specific styles */
    color: inherit;
    text-decoration: none;

    /* The whole card is one link so we card level styles here */
    width: 100%;
    background-color: ${backgroundColour};
    :hover {
        background-color: ${backgroundOnHover};
    }

    /* Sometimes a headline contains it's own link so we use the
       approach described below to deal with nested links
       See: https://css-tricks.com/nested-links/ */
    :before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
`;

type Props = {
    children: JSXElements;
    linkTo: string;
};

export const CardLink = ({ children, linkTo }: Props) => {
    const theme = useTheme<ThemeType>();

    return (
        <a
            href={linkTo}
            className={linkStyles({
                backgroundColour: theme.card.backgroundColour,
                backgroundOnHover: theme.card.backgroundOnHover,
            })}
        >
            {children}
        </a>
    );
};
