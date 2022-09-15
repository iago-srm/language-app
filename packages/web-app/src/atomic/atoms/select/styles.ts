export const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles) => {
        return {
            ...styles,
            color: "black",
            fontSize: '0.8rem'
        };
    }
}