import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";

const DataTable = ({
  rowData = [],
  colDefs = [],
  pagination = true,
  paginationPageSize = 10,
  paginationPageSizeSelector = [10, 25, 50],
  height = 513,
}) => {
  const modules = [AllCommunityModule];
  const gridRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    gridRef.current.api.setGridOption("quickFilterText", value);
  };

  // Inject checkbox into first existing column only
  const updatedColDefs = colDefs.map((col, index) =>
    index === 0
      ? { ...col, headerCheckboxSelection: true, checkboxSelection: true }
      : col
  );

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      </div>

      <AgGridProvider modules={modules}>
        <div style={{ height: height }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={updatedColDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            rowSelection="multiple"
            suppressRowClickSelection={true}
          />
        </div>
      </AgGridProvider>
    </>
  );
};

export default DataTable;