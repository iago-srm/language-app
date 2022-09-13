import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'components/tooltip';

export const QuestionTooltip = ({ content }) => {
    return (
        <Tooltip content={content}>
            <FontAwesomeIcon icon={faQuestionCircle} />
        </Tooltip>
    )
} 