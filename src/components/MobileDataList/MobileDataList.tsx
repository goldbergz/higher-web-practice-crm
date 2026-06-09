import FlexContainer from "../FlexContainer/FlexContainer";

import MobileDataListRow from "./MobileDataListRow";

import type React from "react";

interface MobileDataListProps<T> {
  getItemId: (item: T) => string;
  items: T[];
  onItemClick?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
}

function MobileDataList<T>({
  getItemId,
  items,
  onItemClick,
  renderItem,
}: MobileDataListProps<T>): React.ReactElement {
  return (
    <FlexContainer gap="8px">
      {items.map((item) => (
        <MobileDataListRow
          key={getItemId(item)}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
        >
          {renderItem(item)}
        </MobileDataListRow>
      ))}
    </FlexContainer>
  );
}

export default MobileDataList;
