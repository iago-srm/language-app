import { useState, useEffect } from 'react';
import { Container } from './styles';
import { 
    LoadingErrorData, 
    CustomEditor, 
    TitleAndDetails, 
    CEFRSelect,
    TopicsSelect,
    ContentTypeSelectionForm,
    TextContent,
    VideoTimeInput,
    VideoContent,
    Instructions,
    EditableOptions,
    InstructionModal,
    Section,
    FormButton,
    VideoIdInput,
    ActivityCard
  } from '@atomic';
import {
    getLabeledTopics,
    Instruction
} from '@model';
import { useApiBuilder } from '@services/api';
import { useLanguage } from '@contexts';
import { useRouter } from 'next/router';

export default () => {

    const { getActivity } = useApiBuilder();
    type Return = Awaited<ReturnType<typeof getActivity.apiCall>>;
    const [activity, setActivity] = useState<Return["response"]["activity"]>(undefined);
    const [getActivityError, setGetActivityError] = useState<Return["error"]>();
    const { query } = useRouter();

    const { language } = useLanguage();

    useEffect(() => {
        const id = Number(query.id);
        if(isNaN(id)) setGetActivityError({
            status: 400,
            message: "Activity id is invalid"
        });
        (async () => {
            const { response, error } = await getActivity.apiCall({ id });
            if(error) setGetActivityError(error);
            else setActivity(response.activity);
        })()
    }, [query]);

    return (
        <Container>
        <LoadingErrorData loading={getActivity.loading} error={false} data={activity}>
          {activity && <TitleAndDetails 
            title={activity.title} 
            cefr={activity.cefr} 
            topics={getLabeledTopics(language).filter(topic => {
                return activity.topics.includes(topic.value)
            })}
          />}
        </LoadingErrorData>

        </Container>
    )
}

