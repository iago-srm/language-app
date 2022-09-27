import Link from "next/link";
import { DashboardButtonStyled } from "./styles";

export const DashboardButton = ({ path, icon, label }) => {
    return (
        <DashboardButtonStyled>
            <Link href={path}>
                <a>
                    {icon}
                    <p>{label}</p>
                </a>
            </Link>
        </DashboardButtonStyled>
    )
}