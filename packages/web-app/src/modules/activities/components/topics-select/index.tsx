import { MultiSelect } from "@atomic";
import { useLanguage } from "@contexts";
import { getLabeledTopics } from "@model";

// known bug: if you change language when there is already a topic selected,
// the selected topic doesnt change label.
export const TopicsSelect = ({ onChange, value }) => {
  const { language } = useLanguage();

  return (
    <MultiSelect
      onChange={onChange}
      value={value}
      options={getLabeledTopics(language)}
    />
  );
};
