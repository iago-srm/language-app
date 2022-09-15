import { MultiSelect } from '@atomic';
import { DomainRules } from '@language-app/common-core';

export const TopicsSelect = ({ onChange, value }) => {
    return (
        <MultiSelect 
            onChange={onChange}
            value={value}
            options={DomainRules.ACTIVITY.TOPICS}
        />
    )
}
