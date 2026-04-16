
// import React from 'react';
// import select from 'react-select';
// const CommonSelect = ({
//   options = [],
//   value,
//   onChange,
//   placeholder = 'Select an option...',
//   label,
//   disabled = false,
//   error,
//   required = false,
//   id,
// }) => {
//   const selectId = id || `select-${Math.random().toString(36).slice(2, 7)}`;
 
//   const selectStyle = {
//     width: '100%',
//     padding: '8px 36px 8px 12px',
//     fontSize: '14px',
//     borderRadius: '8px',
//     border: error ? '1px solid #e53e3e' : '1px solid #cbd5e0',
//     backgroundColor: disabled ? '#f7fafc' : '#fff',
//     color: value ? '#1a202c' : '#718096',
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     appearance: 'none',
//     WebkitAppearance: 'none',
//     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 10px center',
//     outline: 'none',
//     transition: 'border-color 0.2s',
//   };
 
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
//       {label && (
//         <label
//           htmlFor={selectId}
//           style={{ fontSize: '13px', fontWeight: 500, color: '#4a5568' }}
//         >
//           {label}
//           {required && <span style={{ color: '#e53e3e', marginLeft: '2px' }}>*</span>}
//         </label>
//       )}
 
//       <select
//         id={selectId}
//         value={value ?? ''}
//         onChange={(e) => onChange?.(e.target.value)}
//         disabled={disabled}
//         required={required}
//         style={selectStyle}
//         onFocus={(e) => (e.target.style.borderColor = '#4299e1')}
//         onBlur={(e) => (e.target.style.borderColor = error ? '#e53e3e' : '#cbd5e0')}
//       >
//         <option value="" disabled>
//           {placeholder}
//         </option>
//         {options.map((opt) => (
//           <option
//             key={opt.value}
//             value={opt.value}
//             disabled={opt.disabled}
//           >
//             {opt.label}
//           </option>
//         ))}
//       </select>
 
//       {error && (
//         <span style={{ fontSize: '12px', color: '#e53e3e' }}>{error}</span>
//       )}
//     </div>
//   );
// };

// export default CommonSelect


import React from "react";
import Select from "react-select";

const CommonSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  disabled = false,
  error,
  required = false,
  isMulti = false,
}) => {
  
  // Find selected option object
  // const selectedOption = options.find(opt => opt.value === value) || null;
   const selectedOption = isMulti
    ? options.filter(opt => value?.includes(opt.value))
    : options.find(opt => opt.value === value) || null;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: error
        ? "#e53e3e"
        : state.isFocused
        ? "#4299e1"
        : "#cbd5e0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4299e1",
      },
      backgroundColor: disabled ? "#f7fafc" : "#fff",
      cursor: disabled ? "not-allowed" : "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#718096",
    }),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
      
      {label && (
        <label style={{ fontSize: "13px", fontWeight: 500, color: "#4a5568" }}>
          {label}
          {required && <span style={{ color: "#e53e3e" }}> *</span>}
        </label>
      )}

      <Select
        options={options}
        value={selectedOption}
        // onChange={(selected) => onChange?.(selected)}
        onChange={(selected) => {
          if (isMulti) {
            const values = selected ? selected.map(item => item.value) : [];
            onChange?.(values);
          } else {
            onChange?.(selected?.value || "");
          }
        }}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles}
        isClearable
        isMulti={isMulti}
      />

      {error && (
        <span style={{ fontSize: "12px", color: "#e53e3e" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default CommonSelect;