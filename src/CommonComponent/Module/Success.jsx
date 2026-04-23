import React from "react";
import "./Success.css";

const Success = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="success-modal">
        
        <div className="icon-circle">
          ✓
        </div>

        <h2>All done!</h2>
        <p>
          Your action was completed successfully.<br />
          Everything looks great.
        </p>

        <button className="continue-btn" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Success;