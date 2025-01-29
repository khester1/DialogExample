import * as React from "react";
import { SearchWorkflowComponent } from "./search.worrkflowcomponent";

const options = [
  { key: "1", name: "Option 1" },
  { key: "2", name: "Option 2" },
  { key: "3", name: "Option 3" },
];

const SearchWorkflowInventoryComponent: React.FC = () => {
  const handleSearch = (option: { key: string; name: string }) => {
    console.log("Selected option:", option);
  };

  return (
    <>
      <SearchWorkflowComponent options={options} onSearch={handleSearch} />
    </>
  );
};

export default SearchWorkflowInventoryComponent;
