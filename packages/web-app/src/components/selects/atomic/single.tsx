import ReactSelect from 'react-select';
import { format, deFormat } from './helpers';
import { colorStyles } from './styles';

export const SingleSelect = ({ options, onChange, value }) => {

    return (
        options[0].value && options[0].label ? 
        <ReactSelect 
            options={options}  
            value={value}   
            styles={colorStyles}
            onChange={onChange}
            classNamePrefix="select"
        /> :         
        <ReactSelect 
            options={format(options)}  
            value={format([value])[0]}   
            styles={colorStyles}
            onChange={(v) => onChange(deFormat([v])[0])}
            classNamePrefix="select"
        />
    )
}