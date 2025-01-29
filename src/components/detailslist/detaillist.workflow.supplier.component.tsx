import React, { useState } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
  IObjectWithKey,
} from "@fluentui/react/lib/DetailsList";

interface DetailsListComponentProps {
  items?: IDetailsListCompactItems[];
  selection?: Selection;
}

export interface IDetailsListCompactItems {
  key: string;
  releasenumber: string;
  deliveryperiod: string;
  id: string;
  origin: string;
  order: string;
  perloadqty: string;
  price?: string;
}

const DetailsListWorkflowSupplierComponent: React.FC<
  DetailsListComponentProps
> = ({ items = [], selection }) => {
  const [sortedItems, setSortedItems] =
    useState<IDetailsListCompactItems[]>(items);
  const [currentSort, setCurrentSort] = useState<{
    field: string;
    direction: boolean;
  }>({ field: "", direction: false });

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
      name: "Release #",
      fieldName: "releasenumber",
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "releasenumber",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column2",
      name: "Delivery Period",
      fieldName: "deliveryperiod",
      minWidth: 80,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "deliveryperiod",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column3",
      name: "Origin",
      fieldName: "origin",
      minWidth: 120,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "origin",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column4",
      name: "Order",
      fieldName: "order",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "unorderits",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
    },
    {
      key: "column5",
      name: "Period Load Qty",
      fieldName: "perloadqty",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isSorted: currentSort.field === "perloadqty",
      isSortedDescending: currentSort.direction,
      onColumnClick: onColumnClick,
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

export { DetailsListWorkflowSupplierComponent };
