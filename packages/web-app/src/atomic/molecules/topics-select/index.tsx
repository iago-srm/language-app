import { MultiSelect } from '@atomic';
import { DomainRules } from '@language-app/common-core';
import { useLanguage } from '@contexts';
import { Translations, Labels } from '@locale';

// https://stackoverflow.com/a/67480517
export const TopicsSelect = ({ onChange, value }) => {

    const { language } = useLanguage();

    const topicsLabels = {
        "SCIENCE_&_TECHNOLOGY": Translations[language][Labels['SCIENCE_&_TECHNOLOGY']],
        "CURRENT_AFFAIRS": Translations[language][Labels["CURRENT_AFFAIRS"]],
        "SPORTS": Translations[language][Labels.SPORTS],
        "ARTS": Translations[language][Labels.ARTS]
    }

    return (
        <MultiSelect 
            onChange={onChange}
            value={value}
            options={DomainRules.ACTIVITY.TOPICS.map(topic => ({ label: topicsLabels[topic], value: topic }))}
        />
    )
}
