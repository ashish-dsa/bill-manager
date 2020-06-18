import React from "react";
export const SelectDropdown = ({ dropdowns, stateUpdater, dropDownparam }) => {
  return (
    <select
      required
      defaultValue="Select all"
      onChange={(e) => stateUpdater(e.currentTarget.value)}
    >
      <option disabled={false} value="Select all" hidden={false}>
        Select all
      </option>
      {dropdowns.map((dropdown, index) => {
        return (
          <option key={index} value={dropdown[dropDownparam]}>
            {dropdown[dropDownparam]}
          </option>
        );
      })}
    </select>
  );
};
