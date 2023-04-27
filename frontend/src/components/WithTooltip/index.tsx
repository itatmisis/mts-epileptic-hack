import { HTMLAttributes } from "react";
import "./styles.module.scss";

interface WithTooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: JSX.Element;
  tooltip: string;
  onClick: () => void;
}

const WithTooltip = ({
  tooltip,
  children,
  onClick,
  ...props
}: WithTooltipProps) => {
  return (
    <div
      {...props}
      style={{
        width: "100%",
        height: "100%",
      }}
      data-tooltip={tooltip}
      onClick={(e) => {
        e.currentTarget.blur();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.click();
        }
      }}
      tabIndex={0}
      role="button"
    >
      {children}
    </div>
  );
};

export default WithTooltip;
