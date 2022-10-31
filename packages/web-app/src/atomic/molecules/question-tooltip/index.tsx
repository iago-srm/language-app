import { Icons, Tooltip } from "@atomic/atoms";

export const QuestionTooltip = ({ content }) => {
  return (
    <Tooltip content={content}>
      <Icons.QUESTION_CIRCLE />
    </Tooltip>
  );
};
