import { ActivityCardContainer } from "./styles";
import { TopicsDisplay } from '../activity-display/topics';
import { CEFRDisplay } from "../activity-display/cefr";
import { useRouter } from 'next/router';

export const ActivityCard = ({ id, title, description, topics, cefr, contentType }) => {
  const router = useRouter();

    const onClickCard = (id) => {
        router.push(`/activities/${id}/do`);
    }
    return (
        <ActivityCardContainer onClick={() => onClickCard(id)}>
            <h3>{title}</h3>
            <p>{description}</p>
            <TopicsDisplay topics={topics}/>
            <CEFRDisplay cefr={cefr} />
            <p>{contentType}</p>
        </ActivityCardContainer>
    )
}