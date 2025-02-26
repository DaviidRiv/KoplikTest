import React, { useEffect, useState } from "react";
import {
    Alert,
    ChakraProvider,
    defaultSystem,
} from "@chakra-ui/react";

type AlertData = {
  uuid: string;
  message: string;
};

const AlertSuccess: React.FC = () => {
  const [alertData, setAlertData] = useState<AlertData | null>(null);

  useEffect(() => {
    // Obtiene los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const uuid = params.get("uuid");

    if (success === "true" && uuid) {
      setAlertData({
        uuid,
        message: "Datos insertados exitosamente.",
      });
      // Limpiar la URL para evitar que el alert se muestre nuevamente
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (!alertData) return null;

  return (
    <ChakraProvider value={defaultSystem}>
    <Alert.Root status="info" title="This is the alert">
      <Alert.Indicator />
      <Alert.Title>
        {alertData.message} <br/> Tu UUID es: {alertData.uuid}, utilizalo para consultar tus resultados.
      </Alert.Title>
    </Alert.Root>
    </ChakraProvider>
  );
};

export default AlertSuccess;
