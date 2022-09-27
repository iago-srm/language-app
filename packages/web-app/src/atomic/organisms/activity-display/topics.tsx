import { RadioMenu, BreadCrumb, CheckboxMenu } from '@atomic';
import { TopicsColors, CEFRColors } from '@model';

export const TopicsBreadCrumbs = {
    "SCIENCE_&_TECHNOLOGY": ({ label }) => (
        <BreadCrumb color={TopicsColors["SCIENCE_&_TECHNOLOGY"]}>
            {label}
        </BreadCrumb>
    ),
    "ARTS": ({ label }) => (
        <BreadCrumb color={TopicsColors["ARTS"]}>
            {label}
        </BreadCrumb>
    ),
    "CURRENT_AFFAIRS": ({ label }) => (
        <BreadCrumb color={TopicsColors["CURRENT_AFFAIRS"]}>
            {label}
            
        </BreadCrumb>
    ),
    "SPORTS": ({ label }) => (
        <BreadCrumb color={TopicsColors["SPORTS"]}>
            {label}
            
        </BreadCrumb>
    ),
}

export const TopicsDisplay = ({ topics }) => {
    return topics && topics.map((topic,i) => {
        const Component = TopicsBreadCrumbs[topic.value || topic];
        return <Component key={i} label={topic.label || topic}/>
    })
}
