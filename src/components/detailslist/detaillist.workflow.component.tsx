import React, { useState } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";

interface DetailsListComponentProps {
  items?: IDetailsListCompactItems[];
  onSelectionChange?: (selectedItem: IDetailsListCompactItems | null) => void;
}

export interface IDetailsListCompactItems {
  key: string;
  contractnumber: string;
  product: string;
  id: string;
  duedate: string;
  units: string;
  pending: string;
  price?: string;
  percentremaining?: string;
  estimatedremaining?: string;
}

const DetailsListWorkflowComponent: React.FC<DetailsListComponentProps> = ({
  items = [],
  onSelectionChange,
}) => {
  const [sortedItems, setSortedItems] =
    useState<IDetailsListCompactItems[]>(items);
  const [currentSort, setCurrentSort] = useState<{
    field: string;
    direction: boolean;
  }>({ field: "", direction: false });

  // Initialize the Selection object
  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection();
      if (onSelectionChange && selectedItems.length > 0) {
        onSelectionChange(selectedItems[0] as IDetailsListCompactItems);
      } else if (onSelectionChange) {
        onSelectionChange(null);
      }
    },
  });

  const onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const newDirection =
      currentSort.field === column.fieldName ? !currentSort.direction : true;
    const newItems = sortedItems.slice().sort((a, b) => {
      const valueA =
        a[column.fieldName as keyof IDetailsListCompactItems] ?? "";
      const valueB =
        b[column.fieldName as keyof IDetailsListCompactItems] ?? "";

      if (valueA < valueB) {
        return newDirection ? -1 : 1;
      }
      if (valueA > valueB) {
        return newDirection ? 1 : -1;
      }
      return 0;
    });

    setSortedItems(newItems);
    setCurrentSort({ field: column.fieldName || "", direction: newDirection });
  };

  function formatDate(dateString: string | number | Date) {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Contract #",
      fieldName: "contractnumber",
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "contractnumber",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column2",
      name: "Product",
      fieldName: "product",
      minWidth: 80,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "product",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column3",
      name: "Due Date",
      fieldName: "duedate",
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "duedate",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
      onRender: (item: IDetailsListCompactItems) =>
        formatDate(item.duedate ?? ""),
    },
    {
      key: "column4",
      name: "Units",
      fieldName: "units",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "units",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column5",
      name: "Pending",
      fieldName: "pending",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "pending",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
      styles: {
        root: {
          color: "red",
        },
      },
    },
    {
      key: "column6",
      name: "Est. Remaining",
      fieldName: "estimatedremaining",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "estimatedremaining",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column7",
      name: "Price",
      fieldName: "price",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "price",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column8",
      name: "Pct. Remaining",
      fieldName: "percentremaining",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "percentremaining",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
      onRender: (item: IDetailsListCompactItems) => {
        const percent = parseFloat(
          item.percentremaining?.replace("%", "") || "0"
        );
        const cellStyles: React.CSSProperties = {
          position: "relative",
          background: `linear-gradient(to right, ${
            percent >= 100 ? "green" : "orange"
          } ${percent}%, transparent ${percent}%)`,
          padding: "5px",
          color: "white",
        };
        return <div style={cellStyles}>{item.percentremaining}</div>;
      },
    },
  ];

  return (
    <DetailsList
      items={sortedItems}
      columns={columns}
      setKey="set"
      compact={true}
      selectionMode={SelectionMode.single}
      selection={selection}
      selectionPreservedOnEmptyClick={true}
    />
  );
};

export { DetailsListWorkflowComponent };
