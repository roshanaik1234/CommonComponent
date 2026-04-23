import React, { useState, useRef, useCallback } from "react";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getExt = (name) =>
  name.includes(".") ? name.split(".").pop().toUpperCase() : "FILE";

const extColors = {
  jpg: "#fef3c7", jpeg: "#fef3c7", png: "#fef3c7", gif: "#fef3c7", webp: "#fef3c7", svg: "#fef3c7",
  pdf: "#fee2e2",
  mp4: "#ede9fe", mov: "#ede9fe", avi: "#ede9fe",
  zip: "#e5e7eb", rar: "#e5e7eb",
  js: "#d1fae5", ts: "#d1fae5", jsx: "#d1fae5", tsx: "#d1fae5",
  py: "#dbeafe", html: "#dbeafe", css: "#dbeafe", json: "#dbeafe",
};

const getExtColor = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  return extColors[ext] || "#f3f4f6";
};

const FileItem = ({ file, onRemove }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 14px",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
  }}>
    <div style={{
      minWidth: 40, height: 40, borderRadius: 8,
      background: getExtColor(file.name),
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 9, fontWeight: 700, color: "#555", letterSpacing: "0.5px",
    }}>
      {getExt(file.name)}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{
        margin: 0, fontSize: 13, fontWeight: 600, color: "#111",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{file.name}</p>
      <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{formatSize(file.size)}</p>
    </div>
    <button
      onClick={onRemove}
      style={{
        padding: "4px 10px", fontSize: 12, borderRadius: 6,
        border: "1px solid #e5e7eb", background: "transparent",
        color: "#888", cursor: "pointer",
      }}
    >
      Remove
    </button>
  </div>
);

const CommomDrganddrp = () => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const addFiles = useCallback((incoming) => {
    const newFiles = Array.from(incoming).map((f) => ({
      file: f,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleChange = (e) => {
    if (e.target.files.length) addFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (id) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: "0 16px", fontFamily: "sans-serif" }}>

      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${dragging ? "#3b82f6" : "#d1d5db"}`,
          borderRadius: 14,
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "#eff6ff" : "#fafafa",
          transition: "border-color 0.15s, background 0.15s",
          userSelect: "none",
        }}
      >
        <svg
          viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: 40, height: 40, margin: "0 auto 12px", display: "block", color: dragging ? "#3b82f6" : "#9ca3af" }}
        >
          <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 18v8M17 21l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <p style={{ fontSize: 15, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>
          {dragging ? "Release to drop" : "Drop files here"}
        </p>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 16px" }}>or click to browse</p>

        <button
          onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}
          style={{
            fontSize: 13, padding: "7px 18px", borderRadius: 8,
            border: "1px solid #d1d5db", background: "#fff",
            cursor: "pointer", color: "#374151", fontWeight: 500,
          }}
        >
          Browse files
        </button>

        <input ref={inputRef} type="file" multiple onChange={handleChange} style={{ display: "none" }} />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map(({ file, id }) => (
            <FileItem key={id} file={file} onRemove={() => removeFile(id)} />
          ))}
          <button
            onClick={() => setFiles([])}
            style={{
              marginTop: 4, fontSize: 12, padding: "6px 14px", alignSelf: "flex-end",
              borderRadius: 8, border: "1px solid #fca5a5", background: "#fff",
              color: "#ef4444", cursor: "pointer",
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default CommomDrganddrp;