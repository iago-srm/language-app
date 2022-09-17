import styled from 'styled-components';

export const SelectedOptionIconContainer = styled.span`
    color: ${({theme}) => theme.colors.text};
`;

export const SelectedOptionLabelContainer = styled.span`
    display: inline-block;
    margin: 0 5px;
    color: ${({theme}) => theme.colors.text};
`;

export const getStyles = (theme) => ({
    control: (styles) => ({
        ...styles, 
        backgroundColor: theme.colors.secondary, 
    }),
    option: (styles) => {
        return {
            ...styles,
            color: theme.colors.text,
            backgroundColor: theme.colors.secondary, 
        };
    },
    menu: (styles) => ({
        ...styles,
        backgroundColor: theme.colors.secondary, 
    })
})