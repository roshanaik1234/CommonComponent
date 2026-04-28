import { useState, useCallback, useEffect } from "react";
import "./ToastAlert.css";

const ICONS = {
  success: (
    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
      <polyline points="2,6 5,9 10,3" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" width="11" height="11">
      <line x1="3" y1="3" x2="9" y2="9" />
      <line x1="9" y1="3" x2="3" y2="9" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" width="11" height="11">
      <line x1="6" y1="2" x2="6" y2="7" />
      <circle cx="6" cy="10" r="0.5" fill="white" stroke="white" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" width="11" height="11">
      <circle cx="6" cy="6" r="5" />
      <line x1="6" y1="5.5" x2="6" y2="8.5" />
      <circle cx="6" cy="3.5" r="0.5" fill="white" stroke="white" />
    </svg>
  ),
};

const DURATION = 4000;

// Single Toast item
const ToastItem = ({ id, type, title, message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), DURATION);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__icon">{ICONS[type]}</div>
      <div className="toast__body">
        <p className="toast__title">{title}</p>
        {message && <p className="toast__message">{message}</p>}
      </div>
      <button className="toast__close" onClick={() => onRemove(id)}>
        &times;
      </button>
      <div className="toast__progress" />
    </div>
  );
};

// Container that renders all toasts
const ToastAlert = ({ toasts, onRemove }) => {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  );
};

// Hook — use this in App.js
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, title, message = "") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [{ id, type, title, message }, ...prev]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
};

export default ToastAlert;