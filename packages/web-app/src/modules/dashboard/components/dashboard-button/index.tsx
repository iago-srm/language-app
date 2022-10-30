import Link from "next/link";
import { DashboardButtonStyled } from "./styles";
import { Heading } from "@atomic";

interface DashboardButton {
  path: string;
  icon: any;
  label: string;
  query?: { [k: string]: any };
  description: string;
}
export const DashboardButton = ({
  path,
  icon,
  label,
  query,
  description,
}: DashboardButton) => {
  return (
    <DashboardButtonStyled>
      <Link href={{ pathname: path, query }}>
        <a>
          <div className="icon-name">
            {icon}
            <div className="heading-container">
              <Heading level={3} fontWeight="bold">
                {label}
              </Heading>
            </div>
          </div>
          <p>{description}</p>
        </a>
      </Link>
    </DashboardButtonStyled>
  );
};
