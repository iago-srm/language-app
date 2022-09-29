export const format = (options) => {
    if(!options.value && !options.label) return options.map(option => ({label: option, value: option}));
    return options;
}
export const deFormat = (options) => options.map(t => t.value);