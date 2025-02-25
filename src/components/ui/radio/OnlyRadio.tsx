import React from "react";
import "./StyleRadio.css";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  children: React.ReactNode;
}

export const OnlyRadio: React.FC<RadioProps> = ({
  value,
  children,
  name,
  checked,
  onChange,
  onBlur,
  ...rest
  }) => {
  return (
    <label className="radio" style={{ margin: "3px" }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      <span className="checkmark"></span>
      {children}
    </label>
  );
};
