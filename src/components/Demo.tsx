"use client"

import React from "react"
import { Stack, ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Radio, RadioGroup } from "./ui/radio" // Asegúrate de importar desde el paquete correcto

const Demo = () => {
  const [value, setValue] = React.useState('1')

  return (
    <ChakraProvider value={defaultSystem}>
      <RadioGroup
        onChange={(e: React.FormEvent<HTMLDivElement>) => {
            // Suponiendo que el target es el input (o puedes necesitar un cast más específico)
            const target = e.target as HTMLInputElement;
            setValue(target.value);
        }}
        value={value}
        >
        <Stack direction='row'>
            <Radio value='1'>First</Radio>
            <Radio value='2'>Second</Radio>
            <Radio value='3'>Third</Radio>
        </Stack>
        </RadioGroup>
    </ChakraProvider>
  )
}

export default Demo