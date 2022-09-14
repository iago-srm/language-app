import { Icons } from '@components';
import { Tooltip } from 'components/tooltip';

export const QuestionTooltip = ({ content }) => {
    return (
        <Tooltip content={content}>
            <Icons.QUESTION_CIRCLE />
        </Tooltip>
    )
} 