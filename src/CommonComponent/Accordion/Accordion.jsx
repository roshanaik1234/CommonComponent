import React, { useState } from 'react'
import "./Accordion.css"

const Accordion = ({ items = [], allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
 
  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };
 
  if (items.length === 0) return null;
 
  return (
    <div className="accordion-wrapper">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className={`accordion-item${isOpen ? " open" : ""}`}>
            <div className="accordion-header" onClick={() => toggle(index)} aria-expanded={isOpen}>
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="1" x2="6" y2="11" />
                  <line x1="1" y1="6" x2="11" y2="6" />
                </svg>
              </span>
            </div>
            <div className="accordion-body-wrapper">
              <div className="accordion-body-inner">
                <div className="accordion-body">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion
