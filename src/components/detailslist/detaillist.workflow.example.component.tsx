import React from "react";
import { DetailsListWorkflowComponent } from "./detaillist.workflow.component";

const DetailedListParent: React.FC = () => {
  const exampleItems = [
    {
      key: "1",
      contractnumber: "007-0234560-01",
      product: "AH",
      duedate: "2024-09-24",
      units: "136.40",
      pending: "75.00",
      estimatedremaining: "61.4",
      price: "$96.00",
      percentremaining: "45%",
      id: "1",
    },
    {
      key: "2",
      contractnumber: "007-0234560-02",
      product: "AH",
      duedate: "2024-10-24",
      units: "136.36",
      pending: "0.00",
      estimatedremaining: "136.36",
      price: "$96.00",
      percentremaining: "100%",
      id: "2",
    },
  ];

  return (
    <div>
      <DetailsListWorkflowComponent items={exampleItems} />
    </div>
  );
};

export default DetailedListParent;
