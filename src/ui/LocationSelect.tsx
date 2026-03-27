"use client";

import { useMemo, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { Country, State, City } from "country-state-city";

export type Option = { value: string; label: string };

interface LocationSelectProps {
  selectedCountry?: Option | null;
  selectedState?: Option | null;
  selectedCity?: Option | null;
  setSelectedCountry?: (val: Option | null) => void;
  setSelectedState?: (val: Option | null) => void;
  setSelectedCity?: (val: Option | null) => void;
}

const customStyles: StylesConfig<Option, false> = {
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

export default function LocationSelect({
  selectedCountry: controlledCountry,
  selectedState: controlledState,
  selectedCity: controlledCity,
  setSelectedCountry: setControlledCountry,
  setSelectedState: setControlledState,
  setSelectedCity: setControlledCity,
}: LocationSelectProps) {
  const [internalCountry, setInternalCountry] = useState<Option | null>(null);
  const [internalState, setInternalState] = useState<Option | null>(null);
  const [internalCity, setInternalCity] = useState<Option | null>(null);

  const selectedCountry = controlledCountry ?? internalCountry;
  const selectedState = controlledState ?? internalState;
  const selectedCity = controlledCity ?? internalCity;

  const setSelectedCountry = setControlledCountry ?? setInternalCountry;
  const setSelectedState = setControlledState ?? setInternalState;
  const setSelectedCity = setControlledCity ?? setInternalCity;

  // Countries
  const countries = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      label: c.name,
      value: c.isoCode,
    }));
  }, []);

  // States
  const states = useMemo(() => {
    if (!selectedCountry) return [];

    return State.getStatesOfCountry(selectedCountry.value).map((s) => ({
      label: s.name,
      value: s.isoCode,
    }));
  }, [selectedCountry]);

  // Cities
  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];

    return City.getCitiesOfState(
      selectedCountry.value,
      selectedState.value,
    ).map((c) => ({
      label: c.name,
      value: c.name,
    }));
  }, [selectedCountry, selectedState]);

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <Select
          instanceId="country-select"
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Select Country"
          isClearable
          styles={customStyles}
        />
      </div>

      <div style={{ flex: 1 }}>
        <Select
          instanceId="state-select"
          options={states}
          value={selectedState}
          onChange={setSelectedState}
          placeholder="Select State"
          isDisabled={!selectedCountry}
          isClearable
          styles={customStyles}
        />
      </div>

      <div style={{ flex: 1 }}>
        <Select
          instanceId="city-select"
          options={cities}
          value={selectedCity}
          onChange={setSelectedCity}
          placeholder="Select City"
          isDisabled={!selectedState}
          isClearable
          styles={customStyles}
        />
      </div>
    </div>
  );
}
