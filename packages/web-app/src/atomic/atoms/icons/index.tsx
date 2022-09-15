import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPen, 
    faTimes,
    faEye, 
    faEyeSlash,
    faAngleRight, 
    faAngleDown,
    faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';

export const Icons = {
    CLOSE: () => (
        <FontAwesomeIcon icon={faTimes} />
    ),
    DELETE: () => (
        <div style={{ color: "red" }}><FontAwesomeIcon icon={faTimes} /></div>
    ),
    EDIT: () => (
        <FontAwesomeIcon icon={faPen} />
    ),
    CAN_SEE: () => (
        <FontAwesomeIcon icon={faEye} />
    ),
    CANT_SEE: () => (
        <FontAwesomeIcon icon={faEyeSlash} />
    ),
    CHEVRON_RIGHT: () => (
        <FontAwesomeIcon icon={faAngleRight} />
    ),
    CHEVRON_DOWN: () => (
        <FontAwesomeIcon icon={faAngleDown} />
    ),
    QUESTION_CIRCLE: () => (
        <FontAwesomeIcon icon={faQuestionCircle} />
    )
}