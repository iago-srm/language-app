import ReactSelect from 'react-select';
import { format, deFormat } from './helpers';
import { getStyles, SelectedOptionIconContainer, SelectedOptionLabelContainer } from './styles';
import { useColorTheme } from '@contexts';

interface IOptionType {
    label: string;
    value: string;
}

interface ISingleSelectProps {
    options: IOptionType[];
    onChange: (args: any) => any;
    value: IOptionType;
    selectedIcon?: any;
}
export const SingleSelect = ({ options, onChange, value, selectedIcon }: ISingleSelectProps) => {
    const { theme } = useColorTheme();

    return (
        options[0].value && options[0].label ? 
        <ReactSelect 
            formatOptionLabel={(option,context) => {
                if(context.selectValue.includes(option) && selectedIcon) {
                    return (
                        <>
                            <SelectedOptionIconContainer>
                                {selectedIcon}
                            </SelectedOptionIconContainer>
                            <SelectedOptionLabelContainer>
                                {option.label}
                            </SelectedOptionLabelContainer>
                        </>
                    )
                }
                return option.label
            }}
            options={options}  
            value={value}   
            styles={getStyles(theme)}
            onChange={onChange}
        /> :         
        <ReactSelect 
            options={format(options)}  
            value={format([value])[0]}   
            styles={getStyles(theme)}
            onChange={(v) => onChange(deFormat([v])[0])}
        />
    )
}