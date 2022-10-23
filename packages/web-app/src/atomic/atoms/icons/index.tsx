import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPen, 
    faTimes,
    faEye, 
    faEyeSlash,
    faAngleRight, 
    faAngleDown,
    faQuestionCircle,
    faGlobe,
    faSearch,
    faCheck,
    faHourglassHalf,
    faPlus,
    faList,
    faUserPlus 
} from '@fortawesome/free-solid-svg-icons';

export const Icons = {
    CLOSE: () => (
        <FontAwesomeIcon icon={faTimes} />
    ),
    DELETE: () => (
        <div style={{ padding: "5px" }}><FontAwesomeIcon icon={faTimes} /></div>
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
    CHEVRON_RIGHT: ({onClick}: any) => {
        return <FontAwesomeIcon icon={faAngleRight} onClick={onClick}/>
    },
    CHEVRON_DOWN: ({onClick}: any) => (
        <FontAwesomeIcon icon={faAngleDown} onClick={onClick}/>
    ),
    QUESTION_CIRCLE: () => (
        <FontAwesomeIcon icon={faQuestionCircle} />
    ),
    GLOBE: () => (
        <FontAwesomeIcon icon={faGlobe} />
    ),
    SEARCH: () => (
        <FontAwesomeIcon icon={faSearch} />
    ),
    CHECK: () => (
        <FontAwesomeIcon icon={faCheck} />
    ),
    IN_PROGRESS: () => (
        <FontAwesomeIcon icon={faHourglassHalf} />
    ),
    PLUS: () => (
        <FontAwesomeIcon icon={faPlus} />
    ),
    LIST: () => (
        <FontAwesomeIcon icon={faList} />
    ),
    USER_PLUS: () => (
        <FontAwesomeIcon icon={faUserPlus} />
    )
}