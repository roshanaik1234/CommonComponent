import { useEffect, useState } from "react";
import "./App.css";
import InputComp from "./CommonComponent/InputComp";
import CommonSelect from "./CommonComponent/ReactSelect";
import DataTable from "./CommonComponent/DataTable";
import Check_Box_Table from "./CommonComponent/Check_Box_Table";
import Multi_row_Table from "./CommonComponent/Multi_row_Table";
import { convertToBase64 } from "./CommonComponent/ConvertBase64";
import { base64UrlEncode, decryptWithCrypto, encryptWithCrypto } from "./CommonComponent/CryptoEncDecr";

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
    const [selectedCountrymul, setSelectedCountrymul] = useState(null);
  console.log("selectedCountry", selectedCountry);
  const countries = [
    { value: "in", label: "India" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "make", flex: 1 },
    { field: "model", flex: 1 },
    { field: "price", flex: 1 },
    { field: "electric", flex: 1,sortable: false, filter: false },
  ]);

  const colDefsM = [
  { field: "orderId", headerName: "Order ID",flex: 1 },
  { field: "customer", headerName: "Customer",flex: 1 },
  { field: "items",    headerName: "Items",flex: 1 },   // ← array → inner table
  { field: "prices",   headerName: "Price",flex: 1 },   // ← array → inner table
  { field: "status",   headerName: "Status",flex: 1 },
];

const rowDataM = [
  {
    orderId:  "#1001",
    customer: "Alice Chen",
    items:    ["Widget A × 2", "Gadget B × 1", "Doohickey C × 3"],
    prices:   ["$40.00",       "$15.00",        "$36.00"],
    status:   "Delivered",
  },
  {
    orderId:  "#1001",
    customer: "Alice Chen",
    items:    ["Widget A × 2", "Gadget B × 1", "Doohickey C × 3"],
    prices:   ["$40.00",       "$15.00",        "$36.00"],
    status:   "Delivered",
  },
  {
    orderId:  "#1001",
    customer: "Alice Chen",
    items:    ["Widget A × 2", "Gadget B × 1", "Doohickey C × 3"],
    prices:   ["$40.00",       "$15.00",        "$36.00"],
    status:   "Delivered",
  },
  {
    orderId:  "#1001",
    customer: "Alice Chen",
    items:    ["Widget A × 2", "Gadget B × 1", "Doohickey C × 3"],
    prices:   ["$40.00",       "$15.00",        "$36.00"],
    status:   "Delivered",
  },
  {
    orderId:  "#1001",
    customer: "Alice Chen",
    items:    ["Widget A × 2", "Gadget B × 1", "Doohickey C × 3"],
    prices:   ["$40.00",       "$15.00",        "$36.00"],
    status:   "Delivered",
  },
];

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  console.log(base64);
};

const handelEncy=async()=>{
  const id=3
      const encryptID = await encryptWithCrypto(`${id}`)
      console.log("encryptID",encryptID)
    //       const baseEncrypt = base64UrlEncode(encryptID);
    // console.log("baseEncrypt",baseEncrypt)
      const decryptID= await decryptWithCrypto(encryptID)
      console.log("decryptID",decryptID)

}

  return (
    <>
      <div>
        <div>
          <button onClick={handelEncy}>EncytoDecy</button>
        </div>
        <div>
          <h1>file to base64</h1>
           <input type="file" onChange={handleFileChange} />
        </div>
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
        <h2>common react select_Multi select</h2>
        <CommonSelect
          options={countries}
          value={selectedCountrymul}
          onChange={setSelectedCountrymul}
          placeholder="Select a country"
          label="Country"
          required={false}
          isMulti={true}
          // error={selectedCountry ? "" : "Please select a country"}
        />
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
          isMulti={false}
          // error={selectedCountry ? "" : "Please select a country"}
        />
      </div>
      <div>
        <h2>common data table</h2>
        <DataTable rowData={rowData} colDefs={colDefs} />
      </div>
       <div>
        <h2>check_Box data table</h2>
        <Check_Box_Table rowData={rowData} colDefs={colDefs} />
      </div>
       <div>
        <h2>Multi_row_Table data table</h2>
        <Multi_row_Table rowData={rowDataM} colDefs={colDefsM} />
      </div>


  
    </>
  );
}

export default App;
