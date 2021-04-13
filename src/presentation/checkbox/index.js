import React from "react";
import "./checkbox.scss";

/**
 * Checkbox Component that will create checkbox
 * @param  {object} having all required attributes such as id, handleCheckboxCallback, checked, label
 */

const Checkbox = ({ id, handleCheckboxCallback, checked, label }) => {
  const handleOnChange = (e) => {
    handleCheckboxCallback(e.target.id, e.target.checked);
  };

  return (
    <div class="checkbox">
      <input
        type="checkbox"
        id={id}
        onChange={handleOnChange}
        checked={checked}
      />
      <label for={id}>{label || ""}</label>
    </div>
  );
};

export default Checkbox;
