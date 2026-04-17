import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";

// Renders an inner <table> for array values, plain text otherwise
const MultiRowCellRenderer = ({ value }) => {
  if (!Array.isArray(value)) {
    return <span style={{ padding: "8px 0", display: "block" }}>{value}</span>;
  }
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {value.map((row, i) => (
          <tr
            key={i}
            style={{
              borderBottom:
                i < value.length - 1
                  ? "1px solid #e0e0e0"
                  : "none",
            }}
          >
            <td style={{ padding: "6px 0" }}>{row}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Auto-sizes row height to fit the tallest inner table
const getRowHeight = (params) => {
  const ROW_HEIGHT = 36; // px per sub-row
  const PADDING = 2;
  let maxRows = 1;

  if (params.data) {
    Object.values(params.data).forEach((val) => {
      if (Array.isArray(val)) {
        maxRows = Math.max(maxRows, val.length);
      }
    });
  }
  return maxRows * ROW_HEIGHT + PADDING;
};

const Multi_row_Table = ({
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

  // Inject MultiRowCellRenderer into every col that doesn't already have one
  const enhancedColDefs = colDefs.map((col) => ({
    ...col,
    cellRenderer: col.cellRenderer ?? MultiRowCellRenderer,
    autoHeight: true,
  }));

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
        <div style={{ height }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={enhancedColDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            getRowHeight={getRowHeight}
            defaultColDef={{
              movable: false,
              resizable: false,
            }}
            suppressMovableColumns={true}
          />
        </div>
      </AgGridProvider>
    </>
  );
};

export default Multi_row_Table;