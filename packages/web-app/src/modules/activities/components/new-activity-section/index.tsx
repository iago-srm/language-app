import styled from "styled-components";
import { getChildrenOnDisplayName } from "atomic/utils";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { QuestionTooltip } from "@atomic";

const PanelStyled = styled.div`
  padding: 10px;
`;

const ContentContainer = styled.div``;
const LeftStyled = styled(PanelStyled)``;

const RightStyled = styled(PanelStyled)``;

const SectionStyled = styled.div<{ isBigScreen?: boolean; height: string }>`
  width: 100%;
  div.content {
    display: flex;
    flex-direction: row;
  }
  padding-top: 20px;
  span.tooltip-button {
    display: inline-block;
    padding: 10px;
  }
  ${RightStyled} {
    border-left: 1px solid ${({ theme }) => theme.colors.text};
    width: 60%;
  }
  ${LeftStyled} {
    width: ${({ isBigScreen }) => (isBigScreen ? "40%" : "100%")};
    height: ${({ height }) => height};
  }
  h6 {
    font-weight: bold;
    font-size: 1.2rem;
    display: inline-block;
  }
`;

interface ISectionProps {
  children: any;
  name?: string;
  height?: string;
  tooltipText?: string;
}
const responsiveBreakpoint = 550;

export const Section = ({
  children,
  name,
  height,
  tooltipText,
}: ISectionProps) => {
  const isBigScreen = useMediaQuery({ minWidth: responsiveBreakpoint });

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const content = getChildrenOnDisplayName(children, "Content");

  const panels = content.length ? content[0].props.children : children;
  const left = getChildrenOnDisplayName(panels, "Left");
  const right = getChildrenOnDisplayName(panels, "Right");
  const header = getChildrenOnDisplayName(children, "Header");

  return (
    <SectionStyled isBigScreen={hasMounted && isBigScreen} height={height}>
      <h6>{name}</h6>
      <span className="tooltip-button">
        {tooltipText && <QuestionTooltip content={tooltipText} />}
      </span>
      {header}
      <div className="content">
        <LeftStyled>{left}</LeftStyled>
        {isBigScreen && <RightStyled>{right}</RightStyled>}
      </div>
    </SectionStyled>
  );
};

const Left = ({ children }) => children;
Left.displayName = "Left";
Section.Left = Left;

const Right = ({ children }) => children;
Right.displayName = "Right";
Section.Right = Right;

const Header = ({ children }) => children;
Header.displayName = "Header";
Section.Header = Header;

const Content = ({ children }) => children;
Content.displayName = "Content";
Section.Content = Content;
