import { useState, useEffect } from 'react';
import { Container, InstructionsContainerStyled } from './styles';
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
    InstructionsContainer,
    Instruction,
    EditableOptions,
    InstructionModal,
    Section,
    FormButton,
    VideoIdInput,
    ActivityCard
  } from '@atomic';
import {
    getLabeledTopics,
    // Instruction
} from '@model';
import { useApiBuilder } from '@services/api';
import { useLanguage, useAuth } from '@contexts';
import { useRouter } from 'next/router';

export default () => {

    const { getStudentOutput, postFeedbackToOutput } = useApiBuilder();
    type Return = Awaited<ReturnType<typeof getStudentOutput.apiCall>>;
    const [output, setOutput] = useState<Return["response"]>(undefined);
    const [feedbacks, setFeedbacks] = useState({});
    const [instructions, setInstructions] = useState({});

    const [getOutputError, setGetOutputError] = useState<Return["error"]>();
    const { query } = useRouter();
    const { user } = useAuth();

    const { language } = useLanguage();

    useEffect(() => {
        const id = Number(query.id);
        if(isNaN(id)) setGetOutputError({
            status: 400,
            message: "Output id is invalid"
        });
        (async () => {
            const { response, error } = await getStudentOutput.apiCall({ id });
            if(error) setGetOutputError(error);
            else {
                setOutput(response);
                setGetOutputError(undefined)
            }
        })()
    }, [query]);

    useEffect(() => {
        if(output?.activity) {
            let instructions = {};
            output.activity.instructions.forEach(inst => {
                const thisInstructionOutput = output.outputs.find(output => output.instructionId === inst.id);
                instructions = { ...instructions, [inst.id]: {
                    ...inst,
                    answer: inst.type === "TEXT" ? thisInstructionOutput.textOutput : inst.isMultiCorrect ? thisInstructionOutput.optionsSelections.map(option => option.id) : thisInstructionOutput.optionsSelections.map(option => option.id)[0],
                    onChange: () => {}
                }}
            })
            setInstructions(instructions);
        }
    }, [output]);

    const onClickSubmitFeedback = () => {
        console.log({feedbacks})
        // const outputs = Object.keys(instructions).map(id => {
        //     const thisInstruction = instructions[id];
        //     return {
        //         instructionId: id,
        //         textOutput: thisInstruction.type === "TEXT" && thisInstruction.answer,
        //         optionsSelectionsIds: thisInstruction.type === "OPTIONS" && (thisInstruction.isMultiCorrect ? thisInstruction.answer : [thisInstruction.answer])
        //     }
        // })
        // postStudentOutput.apiCall({
        //     activityId: activity.id,
        //     outputs
        // })
    };

    return (
        <Container>
        <LoadingErrorData loading={getStudentOutput.loading} error={getStudentOutput} data={output?.activity}>
          {output?.activity && 
          <><TitleAndDetails 
            title={output.activity.title} 
            cefr={output.activity.cefr} 
            topics={getLabeledTopics(language).filter(topic => {
                return output.activity.topics.includes(topic.value)
            })}
          />
            {output.activity.description}
            {output.activity.contentType === "TEXT" ? <TextContent text={output.activity.content}/> :               
                <VideoContent 
                youtubeId={output.activity.content}
                start={output.activity.startTime} 
                end={output.activity.endTime} 
              />}
                <InstructionsContainer>
                    {Object.keys(instructions).map(instructionId => (
                        <InstructionsContainerStyled>
                        <Instruction key={instructionId} instruction={instructions[instructionId]} />
                        {!output.feedbackGiven && user?.role === "INSTRUCTOR" && (
                            <textarea value={feedbacks[instructionId]} onChange={e => setFeedbacks(f => ({...f, [instructionId]: e.target.value }))}/>
                        )}
                        </InstructionsContainerStyled>
                    ))}
                    
                </InstructionsContainer>
            </>
          }
        </LoadingErrorData>
          {user.role === "INSTRUCTOR" && <FormButton disabled={output?.feedbackGiven} onClick={onClickSubmitFeedback} loading={postFeedbackToOutput.loading}>
            Salvar
          </FormButton>}
        </Container>
    )
}

// export async function getStaticProps() {
//     const { getActivity } = useApiBuilder();

    
// }