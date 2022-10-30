import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const Tooltip = ({ content, children }) => {
  return (
    <Tippy content={content}>
      <span style={{ padding: "5px" }}>{children}</span>
    </Tippy>
  );
};
