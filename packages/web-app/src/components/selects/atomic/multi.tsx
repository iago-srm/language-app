import ReactSelect from 'react-select';
import { format, deFormat } from './helpers';
import { colorStyles } from './styles';

let select;
export const MultiSelect = ({ options, onChange, value }) => {

    return (
        <ReactSelect 
            isMulti 
            options={format(options)}  
            value={format(value)}   
            styles={colorStyles}
            onChange={(v) => onChange(deFormat(v))}
        />
    )
}