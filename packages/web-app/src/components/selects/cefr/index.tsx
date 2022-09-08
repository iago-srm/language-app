import { SingleSelect } from '../atomic';
import { DomainRules } from '@language-app/common-core';

export const CEFRSelect = ({ onChange, value }) => {
    return (
        <SingleSelect 
            options={DomainRules.CEFR.POSSIBLE_VALUES}  
            value={value}   
            onChange={onChange}
        />
    )
}
