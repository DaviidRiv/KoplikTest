// Demo.tsx
import React, { useState } from "react";
import { RadioGroup } from "./GroupRadio.tsx";
import { OnlyRadio } from "./OnlyRadio.tsx";

const DemoRadio: React.FC = () => {
  const [value, setValue] = useState("1");

  return (
    <div>
      <h2>Elige una opción:</h2>
      <RadioGroup value={value} onChange={setValue}>
        <OnlyRadio value="1">Primera opción</OnlyRadio>
        <OnlyRadio value="2">Segunda opción</OnlyRadio>
        <OnlyRadio value="3">Tercera opción</OnlyRadio>
      </RadioGroup>
      <p>Valor seleccionado: {value}</p>
    </div>
  );
};

export default DemoRadio;