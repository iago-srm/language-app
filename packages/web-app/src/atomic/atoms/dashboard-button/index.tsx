import Link from "next/link";
import { DashboardButtonStyled } from "./styles";

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
                    <p>{label}</p>
                </a>
            </Link>
        </DashboardButtonStyled>
    )
}