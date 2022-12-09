import { ActivityCardContainer } from "./styles";
import { TopicsDisplay } from "../activity-display/topics";
import { CEFRDisplay } from "../activity-display/cefr";
import Router, { useRouter } from "next/router";

export const ActivityCard = ({
  id,
  title,
  description,
  topics,
  cefr,
  contentType,
  isOpen,
}) => {
  const router = useRouter();

  const onClickCard = (id) => {
    // router.push(`/activities/${id}/do`);
    Router.push(
      {
        pathname: `/activities/${id}/do`,
        query: isOpen && { isOpen },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <ActivityCardContainer onClick={() => onClickCard(id)}>
      <h3>{title}</h3>
      <p>{description}</p>
      <TopicsDisplay topics={topics} />
      <CEFRDisplay cefr={cefr} />
      <p>{contentType}</p>
    </ActivityCardContainer>
  );
};
