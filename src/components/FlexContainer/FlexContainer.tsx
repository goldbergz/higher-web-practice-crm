import type React from "react";

interface FlexContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
}

function FlexContainer({
  children,
  className,
  gap = "2px",
}: FlexContainerProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {children}
    </div>
  );
}

export default FlexContainer;
