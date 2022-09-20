import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPen, 
    faTimes,
    faEye, 
    faEyeSlash,
    faAngleRight, 
    faAngleDown,
    faQuestionCircle,
    faGlobe 
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
    CHEVRON_RIGHT: ({onClick}: any) => {
        console.log(onClick)
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
    )
}