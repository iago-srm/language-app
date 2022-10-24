import { useState, useEffect } from 'react';
import { Container } from './styles';
import { 
    LoadingErrorData, 
    FormButton,
  Toast,
  errorToast,
  successToast
} from '@atomic';
import {
    VideoContent,
    TextContent,
    Instruction,
    InstructionsContainer,
    TitleAndDetails, 
} from "../components";
import {
    getLabeledTopics,
    Instruction as InstructionModel
} from '@model';
import { useApiBuilder } from '@services/api';
import { useLanguage } from '@contexts';
import { useRouter } from 'next/router';

export const DoActivity = () => {

    const { getActivity, postStudentOutput } = useApiBuilder();
    type Return = Awaited<ReturnType<typeof getActivity.apiCall>>;
    const [activity, setActivity] = useState<Return["response"]["activity"]>(undefined);
    const [instructions, setInstructions] = useState({});
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
            else {
                setActivity(response.activity);
                setGetActivityError(undefined)
            }
        })()
    }, [query]);

    useEffect(() => {
        if(activity) {
            let instructions = {};
            activity.instructions.forEach(inst => {
                instructions = { ...instructions, [inst.id]: {
                    ...inst,
                    answer: inst.isMultiCorrect ? [] : "",
                    onChange: (instructionId, newValues) => {
                        setInstructions(insts => ({...insts, [instructionId]: { ...insts[instructionId], answer: newValues }}))
                    }
                }}
            })
            setInstructions(instructions);
        }
    }, [activity]);

    const onClickSubmitOutput = async () => {
        const outputs = Object.keys(instructions).map(id => {
            const thisInstruction = instructions[id];
            return {
                instructionId: id,
                textOutput: thisInstruction.type === "TEXT" && thisInstruction.answer,
                optionsSelectionsIds: thisInstruction.type === "OPTIONS" && (thisInstruction.isMultiCorrect ? thisInstruction.answer : [thisInstruction.answer])
            }
        })
        const { error } = await postStudentOutput.apiCall({
            activityId: activity.id,
            outputs
        });
        if(error) errorToast(error.message);
        else successToast("Atividade realizada com sucesso!");
    };

    return (
        <Container>
        <LoadingErrorData loading={getActivity.loading} error={getActivityError} data={activity}>
          {activity && 
          <><TitleAndDetails 
            title={activity.title} 
            cefr={activity.cefr} 
            topics={getLabeledTopics(language).filter(topic => {
                return activity.topics.includes(topic.value)
            })}
          />
            <p>{activity.description}</p>
            <hr/>
            {activity.contentType === "TEXT" ? <TextContent text={activity.content}/> :               
                <VideoContent 
                youtubeId={activity.content}
                start={activity.startTime} 
                end={activity.endTime} 
              />}
                <hr/>
            <p>Responda às perguntas a seguir sobre o conteúdo</p>
              <InstructionsContainer> 
                {Object.keys(instructions).map((instructionId,i) => <Instruction index={i} key={instructionId} instruction={instructions[instructionId]} />)}
              </InstructionsContainer>
            </>
          }
        </LoadingErrorData>
          <FormButton onClick={onClickSubmitOutput} loading={postStudentOutput.loading}>
            Salvar
          </FormButton>
      <Toast/>

        </Container>
    )
}

// export async function getStaticProps() {
//     const { getActivity } = useApiBuilder();

    
// }