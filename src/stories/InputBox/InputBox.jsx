import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InputBox.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const InputBox = ({
  placeholder,
  type,
  size,
  name,
  onChange,
  value,
  onBlur,
  id,
  className,
  isDisabled,
  maxLength,
  showEyeIcon,
}) => {
  const design = type === "Email" ? "form-control1" : "form-control";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`InputBox ${className}`}>
      <input
        type={showPassword ? "text" : type}
        className={["inputBox", `inputBox--${size}`, design].join(" ")}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        name={name}
        aria-describedby="basic-addon1"
        disabled={isDisabled}
        maxLength={maxLength}
      />
      {showEyeIcon && type === "password" && (
        <div className="eye-icon" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
};

InputBox.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  maxLength: PropTypes.number,
  showEyeIcon: PropTypes.bool,
};

InputBox.defaultProps = {
  size: "medium",
};
