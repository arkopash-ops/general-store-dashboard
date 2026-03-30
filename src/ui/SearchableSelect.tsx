"use client";

import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id: string;
  options: OptionType[];
  value: OptionType | null;
  placeholder?: string;
  onChange: (selected: OptionType | null) => void;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1f1f1f",
    borderColor: state.isFocused ? "#f87171" : "#b91c1c",
    borderWidth: "1px",
    borderRadius: "0.375rem",
    padding: "0.25rem",
    boxShadow: state.isFocused ? "0 0 0 2px #f87171" : "none",
    color: "#f5f5f5",
    minHeight: "2.5rem",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1f1f1f",
    color: "#f5f5f5",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f87171" : "#1f1f1f",
    color: "#f5f5f5",
    cursor: "pointer",
  }),
  singleValue: (base) => ({ ...base, color: "#f5f5f5" }),
  placeholder: (base) => ({ ...base, color: "#f5f5f5" }),
  input: (base) => ({ ...base, color: "#f5f5f5" }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: "#b91c1c" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#f87171" : "#b91c1c",
  }),
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id,
  options,
  value,
  placeholder = "Select...",
  onChange,
}) => {
  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    onChange(selectedOption ?? null);
  };

  return (
    <div style={{ width: 300 }}>
      <Select<OptionType, false>
        instanceId={id}
        inputId={id}
        value={value}
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
};

export default SearchableSelect;