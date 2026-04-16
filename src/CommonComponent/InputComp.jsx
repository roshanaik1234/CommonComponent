import React from "react";

const InputComp = ({
  type = "text",
  placeholder = "Enter your name",
  onChange,
  dataTestId = "",
  name = "name",
  required = true,
  disabled = false,
  maxLength = 20,
  label = ""
}) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          data-testid={dataTestId}
          name={name}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          style={{ padding: "5px", width: "100%" }}
        />
      </div>
      <p>
        
      </p>
    </div>
  );
};
export default InputComp;
