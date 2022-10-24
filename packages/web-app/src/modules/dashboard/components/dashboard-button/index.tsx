import Link from "next/link";
import { DashboardButtonStyled } from "./styles";
import { Heading } from '@atomic';

interface DashboardButton {
    path: string;
    icon: any;
    label: string;
    query?: {[k: string]: any};
}
export const DashboardButton = ({ path, icon, label, query }: DashboardButton) => {
    return (
        <DashboardButtonStyled>
            <Link href={{ pathname: path, query}}>
                <a>
                    {icon}
                    <Heading level={3} fontWeight="bold">{label}</Heading>
                </a>
            </Link>
        </DashboardButtonStyled>
    )
}