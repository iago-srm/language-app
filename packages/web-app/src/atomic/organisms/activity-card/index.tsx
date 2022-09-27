import { ActivityCardContainer } from "./styles";
import { TopicsDisplay } from '../activity-display/topics';
import { CEFRDisplay } from "../activity-display/cefr";

export const ActivityCard = ({ title, description, topics, cefr, contentType }) => {
    return (
        <ActivityCardContainer>
            <h3>{title}</h3>
            <p>{description}</p>
            <TopicsDisplay topics={topics}/>
            <CEFRDisplay cefr={cefr} />
            <p>{contentType}</p>
        </ActivityCardContainer>
    )
}