import React from "react";
/**
 *
 * @param {*} name
 * @param {*} label
 * @param {*} value
 * @param {Array} option
 * @returns
 */
const Select = ({ name, label, value, options, error, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <select name={name} id={name} {...rest} className="form-control">
        <option value="">✓</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert danger">{error}</div>}
    </div>
  );
};
export default Select;
