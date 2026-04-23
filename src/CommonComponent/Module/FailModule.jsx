import React from 'react';
import './FailModule.css';

const FailModule = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="fail-modal">
        
        <div className="icon-circle-fail">
          ✕
        </div>

        <h2>Something went wrong</h2>
        <p>
          Your action could not be completed.<br />
          Please try again.
        </p>

        <button className="retry-btn" onClick={onClose}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FailModule;