"use client";

import { Button, useTabs} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { useState } from "react";

const BtnResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const tabs = useTabs();
  const toast = Toaster();

  const handleClick = async () => {
    // Solicitar UUID al usuario
    const uuid = prompt("Por favor ingresa tu UUID:");
    
    if (!uuid) {
        toaster.create({
            title: "Error",
            description: "Debes ingresar un UUID válido",
            type: "error", // Usar type en lugar de status
            duration: 3000,            
          });
      return;
    }

    setIsLoading(true);
    
    try {
      // Hacer la petición a la API
      const response = await fetch(`http://localhost:4321/api/${uuid}.json`);
      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      // Procesar los resultados
      const resultsMessage = data.data
        .sort((a: { idQuestion: number }, b: { idQuestion: number }) => a.idQuestion - b.idQuestion) // Ordenar por pregunta
        .map((item: { idQuestion: number; is_correct: boolean }) => 
          `Pregunta ${item.idQuestion}: ${item.is_correct ? "✅ Correcta" : "❌ Incorrecta"}`
        )
        .join("\n");

      // Mostrar resultados
      alert(`Resultados:\n\n${resultsMessage}`);
      
    } catch (error) {
        toaster.create({
        title: "Error",
        description: (error as Error).message || "Error al obtener los resultados",
        duration: 3000,
        type: "error", // Usar type en lugar de status
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Button
        size="lg"
        colorPalette="purple"
        variant="surface"
        onClick={handleClick}
        loading={isLoading}
        loadingText="Consultando..."
      >
        Consultar Resultados
      </Button>
    </ChakraProvider>
  );
};

export default BtnResults;