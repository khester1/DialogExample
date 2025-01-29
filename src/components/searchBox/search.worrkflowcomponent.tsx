import React, { useState, useEffect, useRef } from "react";
import { ITextFieldStyles, SearchBox } from "@fluentui/react";
import styles from "./search.workflow.module.css";

interface SearchComponentProps {
  options?: { key: string; name: string }[];
  textFieldStyles?: Partial<ITextFieldStyles>;
  value?: string;
  defaultValue?: string;
  onSearch?: any;
  placeholder?: string;
  title?: string;
}

export const SearchWorkflowComponent: React.FC<SearchComponentProps> = ({
  options,
  onSearch,
  placeholder = "",
  title = "Search",
  value,
  ...props
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isTyping, setIsTyping] = useState(false);
  const [searchValue, setSearchValue] = useState(value || "");
  const [selectedOption, setSelectedOption] = useState<{
    key: string;
    name: string;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Active option for keyboard navigation
  const listRef = useRef<HTMLDivElement>(null); // Reference for the autocomplete list

  useEffect(() => {
    // Keep searchValue in sync with the value passed from the parent
    setSearchValue(value || "");
  }, [value]);

  // Function to handle input change
  const onInputChange = (
    event?: React.ChangeEvent<HTMLInputElement>,
    newValue?: string
  ) => {
    setSearchValue(newValue || "");
    setSelectedOption(null); // Clear selection if the user is typing again
    setActiveIndex(null); // Reset active index when typing
    if (newValue === "") {
      setFilteredOptions(options); // Show all options when the search is cleared
      setIsTyping(false);
      if (onSearch) {
        onSearch({ key: "", name: "" });
      }
    } else {
      const filtered = options?.filter((option) =>
        option.name.toLowerCase().includes(newValue?.toLowerCase() || "")
      );
      setFilteredOptions(filtered);
      setIsTyping(true);
    }
  };

  // Function to handle option selection
  const onOptionSelected = (option: { key: string; name: string }) => {
    setSearchValue(option.name);
    setSelectedOption(option); // Set the selected option
    setIsTyping(false);
    if (onSearch) {
      onSearch(option);
    }
  };

  // Function to handle focus (show all options on focus)
  const handleFocus = () => {
    setFilteredOptions(options); // Show all options when the input is focused
    setIsTyping(true); // Set typing to true to display the dropdown list
  };

  // Function to handle blur (when search box loses focus)
  const handleBlur = () => {
    setTimeout(() => {
      setIsTyping(false);
    }, 100); // Small delay to allow click on list items before hiding
  };

  // Function to handle mouse down on the dropdown options
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the blur event when clicking on the dropdown
  };

  // Keyboard event handler for navigating options
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filteredOptions || filteredOptions.length === 0) return;

    switch (e.key) {
      case "ArrowDown": // Navigate down the list
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === filteredOptions.length - 1
            ? 0
            : prevIndex + 1
        );
        break;
      case "ArrowUp": // Navigate up the list
        e.preventDefault();
        setActiveIndex((prevIndex) =>
          prevIndex === null || prevIndex === 0
            ? filteredOptions.length - 1
            : prevIndex - 1
        );
        break;
      case "Enter": // Select the active option
        e.preventDefault(); // Prevent default behavior of the Enter key
        if (activeIndex !== null && filteredOptions[activeIndex]) {
          onOptionSelected(filteredOptions[activeIndex]); // Select active item
        }
        break;
      case "Tab": // Use Tab to navigate out of the search box or select the active option
        if (activeIndex !== null && filteredOptions[activeIndex]) {
          onOptionSelected(filteredOptions[activeIndex]);
        }
        break;
      default:
        break;
    }
  };

  // Automatically scroll to the active option when navigating with keys
  useEffect(() => {
    if (listRef.current && activeIndex !== null) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  return (
    <>
      <SearchBox
        placeholder={placeholder}
        title={title}
        value={searchValue}
        onChange={onInputChange}
        onFocus={handleFocus} // Trigger focus to show all options
        onBlur={handleBlur} // Close dropdown when search box loses focus
        onKeyDown={handleKeyDown} // Add keyboard event listener
        className={selectedOption ? styles.boldUnderlined : ""} // Apply bold and underlined style if option selected
      />
      {isTyping && (
        <div
          className={styles.autocompleteList}
          ref={listRef}
          onMouseDown={handleMouseDown} // Prevent blur event on mouse click
        >
          {filteredOptions && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.key}
                className={`${styles.autocompleteItem} ${
                  activeIndex === index ? styles.activeItem : ""
                }`}
                onClick={() => onOptionSelected(option)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className={styles.noResultsMessage}>No results found</div>
          )}
        </div>
      )}
    </>
  );
};
