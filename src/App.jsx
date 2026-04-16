import { useState } from "react";
import "./App.css";
import InputComp from "./CommonComponent/InputComp";
import CommonSelect from "./CommonComponent/ReactSelect";


function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  console.log("formData", formData);
  const handleInputChange = (e) => {
    console.log("handleInputChange", e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // react select options
  const [selectedCountry, setSelectedCountry] = useState(null);
  console.log("selectedCountry", selectedCountry);
    const countries = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];
  return (
    <>
      <div>
        <h1>commom Input</h1>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          <div style={{ width: "33.00%" }}>
            <InputComp
              label="First Name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => handleInputChange(e)}
              dataTestId="name-input"
              name="name"
              required={true}
              disabled={false}
              maxLength={20}
            />
          </div>
          <div style={{ width: "33.00%" }}>
            <InputComp
              label="Middel Name"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => handleInputChange(e)}
              dataTestId="email-input"
              name="email"
              required={true}
              disabled={false}
              maxLength={100}
            />
          </div>
          <div style={{ width: "33.00%" }}>
            <InputComp
              label="Last Name"
              type="text"
              placeholder="Enter your phone number"
              onChange={(e) => handleInputChange(e)}
              dataTestId="phone-input"
              name="phone"
              required={false}
              disabled={false}
              maxLength={15}
            />
          </div>
          <div style={{ width: "33.00%" }}>
            <InputComp
              label="Address"
              type="text"
              placeholder="Enter your address"
              onChange={(e) => handleInputChange(e)}
              dataTestId="address-input"
              name="address"
              required={false}
              disabled={false}
              maxLength={200}
            />
          </div>
        </div>
      </div>
      <div>
        <h2>common react select</h2>
        <CommonSelect
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        placeholder="Select a country"
        label="Country"
        required={false}
        isMulti={true}
        // error={selectedCountry ? "" : "Please select a country"}
        />
      </div>
    </>
  );
}

export default App;
