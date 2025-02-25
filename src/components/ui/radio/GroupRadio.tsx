import React from "react";
import type { RadioProps } from "./OnlyRadio";

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  name,
}) => {
  // Si no se provee un nombre, se genera uno único
  const groupName =
    name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div role="radiogroup">
      {React.Children.map(children, (child) => {
        // Indica a TypeScript que cada elemento es un ReactElement que posee al menos una prop "value" de tipo string.
        if (React.isValidElement<RadioProps>(child)) {
          return React.cloneElement(child, {
            name: groupName,
            checked: child.props.value === value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value),
          });
        }
        return child;
      })}
    </div>
  );
};
