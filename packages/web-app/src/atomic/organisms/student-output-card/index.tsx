import { ActivityCardContainer } from "./styles";
import { CEFRDisplay } from "../activity-display/cefr";
import { useRouter } from 'next/router';
import { Tooltip, Icons } from '@atomic';

interface IStudentOutputCardProps {
    id: string;
    title: string;
    time: string;
    cefr: string;
    contentType: string;
    instructorName: string;
    feedbackGiven: boolean;
    studentName?: string;
}
export const StudentOutputCard = ({ 
    id, 
    title, 
    time, 
    cefr, 
    contentType, 
    instructorName, 
    feedbackGiven, 
    studentName 
}: IStudentOutputCardProps) => {
  const router = useRouter();

    const onClickCard = (id) => {
        router.push(`/student-output/${id}`);
    }

    return (
        <ActivityCardContainer onClick={() => onClickCard(id)}>
            <div className="header">
                <h3>{title}</h3>
                <Tooltip content={`${feedbackGiven ? `feedback given` : "No feedback yet"}`}>
                    {feedbackGiven ? <Icons.CHECK /> : <Icons.IN_PROGRESS/>}
                </Tooltip>
            </div>
            <p>Realizada em <span>{new Date(time).toLocaleDateString()}</span> às <span>{new Date(time).toLocaleTimeString()}</span> {studentName ? `por ${studentName}` : undefined}</p>
            <p>Criada por {instructorName}</p>
            <CEFRDisplay cefr={cefr} />
            <p>{contentType}</p>
        </ActivityCardContainer>
    )
}