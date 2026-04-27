import { useState } from "react";

// ── InputComp ──────────────────────────────────────────────────────────────
const InputComp = ({
  type = "text",
  placeholder = "",
  onChange,
  dataTestId = "",
  name = "name",
  required = true,
  disabled = false,
  maxLength = 20,
  label = "",
  error = "",
  value = "",
}) => {
  const hasError = !!error;
  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hasError ? "#e05b5b" : "#8a7f72",
            marginBottom: "6px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#c8553d", marginLeft: "3px" }}>*</span>
          )}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        data-testid={dataTestId}
        name={name}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "15px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#1a1612",
          background: disabled ? "#f5f3f0" : "#faf9f7",
          border: `1.5px solid ${hasError ? "#e05b5b" : "#d6cfc5"}`,
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "text",
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = hasError ? "#e05b5b" : "#b8a99a";
            e.target.style.boxShadow = hasError
              ? "0 0 0 3px rgba(224,91,91,0.12)"
              : "0 0 0 3px rgba(184,169,154,0.18)";
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = hasError ? "#e05b5b" : "#d6cfc5";
          e.target.style.boxShadow = "none";
        }}
      />
      {hasError && (
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#e05b5b",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>⚠</span> {error}
        </p>
      )}
      {!hasError && <p style={{ margin: 0, height: "17px" }} />}
    </div>
  );
};

// ── Validation helpers ─────────────────────────────────────────────────────
const validators = {
  firstName: (v) =>
    !v.trim() ? "First name is required" :
    v.trim().length < 2 ? "At least 2 characters" : "",
  middleName: (v) =>
    v && v.trim().length === 1 ? "At least 2 characters if provided" : "",
  lastName: (v) =>
    !v.trim() ? "Last name is required" :
    v.trim().length < 2 ? "At least 2 characters" : "",
  email: (v) =>
    !v.trim() ? "Email is required" :
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : "",
  phone: (v) =>
    !v.trim() ? "Phone number is required" :
    !/^[0-9+\-\s()]{7,15}$/.test(v) ? "Enter a valid phone number" : "",
  dob: (v) => !v ? "Date of birth is required" : "",
  password: (v) =>
    !v ? "Password is required" :
    v.length < 8 ? "At least 8 characters" :
    !/[A-Z]/.test(v) ? "Include at least one uppercase letter" :
    !/[0-9]/.test(v) ? "Include at least one number" : "",
  confirmPassword: (v, all) =>
    !v ? "Please confirm your password" :
    v !== all.password ? "Passwords do not match" : "",
};

const initialValues = {
  firstName: "", middleName: "", lastName: "",
  email: "", phone: "", dob: "",
  password: "", confirmPassword: "",
};

// ── FormValidation ─────────────────────────────────────────────────────────
const FormValidation = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err =
        name === "confirmPassword"
          ? validators.confirmPassword(value, { ...values, [name]: value })
          : validators[name]?.(value) ?? "";
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err =
      name === "confirmPassword"
        ? validators.confirmPassword(values[name], values)
        : validators[name]?.(values[name]) ?? "";
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const err =
        key === "confirmPassword"
          ? validators.confirmPassword(values[key], values)
          : validators[key](values[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const handleSubmit = () => {
    const allTouched = Object.keys(validators).reduce(
      (acc, k) => ({ ...acc, [k]: true }), {}
    );
    setTouched(allTouched);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const fieldProps = (name, extra = {}) => ({
    name,
    value: values[name],
    error: errors[name] || "",
    onChange: handleInputChange,
    onBlur: () => handleBlur(name),
    ...extra,
  });

  // ── Success screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={styles.page}>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <div style={{ ...styles.card, textAlign: "center", padding: "56px 48px" }}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={{ ...styles.title, marginBottom: "10px" }}>
            Registration Complete
          </h2>
          <p style={styles.subtitle}>
            Welcome aboard, {values.firstName}! Your account has been created.
          </p>
          <button onClick={handleReset} style={styles.btnOutline}>
            Register Another
          </button>
        </div>
      </div>
    );
  }

  const progress = Object.keys(validators).filter(
    (k) => !validators[k](values[k], values)
  ).length;
  const total = Object.keys(validators).length;

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <p style={styles.eyebrow}>Create Account</p>
          <h1 style={styles.title}>Registration Form</h1>
          <p style={styles.subtitle}>
            Fill in your details below to get started.
          </p>
          {/* Progress bar */}
          <div style={styles.progressWrap}>
            <div
              style={{
                ...styles.progressBar,
                width: `${(progress / total) * 100}%`,
              }}
            />
          </div>
          <p style={styles.progressLabel}>
            {progress}/{total} fields complete
          </p>
        </div>

        {/* Section: Personal Info */}
        <p style={styles.sectionLabel}>Personal Information</p>
        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <InputComp
              label="First Name"
              placeholder="John"
              {...fieldProps("firstName")}
              maxLength={50}
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputComp
              label="Middle Name"
              placeholder="Optional"
              required={false}
              {...fieldProps("middleName")}
              maxLength={50}
            />
          </div>
        </div>
        <InputComp
          label="Last Name"
          placeholder="Doe"
          {...fieldProps("lastName")}
          maxLength={50}
        />
        <InputComp
          label="Date of Birth"
          type="date"
          {...fieldProps("dob")}
        />

        {/* Section: Contact */}
        <p style={styles.sectionLabel}>Contact Details</p>
        <InputComp
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          dataTestId="email-input"
          {...fieldProps("email")}
          maxLength={100}
        />
        <InputComp
          label="Phone Number"
          type="tel"
          placeholder="+1 555 000 0000"
          {...fieldProps("phone")}
          maxLength={15}
        />

        {/* Section: Security */}
        <p style={styles.sectionLabel}>Security</p>
        <InputComp
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          {...fieldProps("password")}
          maxLength={64}
        />
        <InputComp
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          {...fieldProps("confirmPassword")}
          maxLength={64}
        />

        {/* Actions */}
        <div style={styles.actions}>
          <button onClick={handleReset} style={styles.btnOutline}>
            Reset
          </button>
          <button onClick={handleSubmit} style={styles.btnPrimary}>
            Create Account →
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0ece6",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px 44px",
    width: "100%",
    maxWidth: "560px",
    boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
  },
  header: { marginBottom: "32px" },
  eyebrow: {
    margin: "0 0 6px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#b8a99a",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "26px",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "700",
    color: "#1a1612",
    lineHeight: 1.2,
  },
  subtitle: {
    margin: "0 0 16px",
    fontSize: "14px",
    color: "#8a7f72",
    lineHeight: 1.6,
  },
  progressWrap: {
    height: "4px",
    background: "#ede9e3",
    borderRadius: "99px",
    overflow: "hidden",
    marginBottom: "6px",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #c8553d, #e07d5b)",
    borderRadius: "99px",
    transition: "width 0.4s ease",
  },
  progressLabel: {
    margin: 0,
    fontSize: "11px",
    color: "#b8a99a",
    fontWeight: "600",
    letterSpacing: "0.06em",
  },
  sectionLabel: {
    margin: "0 0 14px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#c8553d",
    borderBottom: "1px solid #ede9e3",
    paddingBottom: "8px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
    paddingTop: "24px",
    borderTop: "1px solid #ede9e3",
  },
  btnPrimary: {
    padding: "12px 28px",
    background: "#1a1612",
    color: "#faf9f7",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "background 0.2s",
  },
  btnOutline: {
    padding: "12px 20px",
    background: "transparent",
    color: "#8a7f72",
    border: "1.5px solid #d6cfc5",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "border-color 0.2s",
  },
  successIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "#f0faf4",
    color: "#3a9e6f",
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    border: "2px solid #b8e8ce",
  },
};

export default FormValidation;