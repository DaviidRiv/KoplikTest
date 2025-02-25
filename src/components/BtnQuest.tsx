"use client";

import { Button, Link } from "@chakra-ui/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const BtnQuest = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Link href="/questions">
        <Button size="lg" colorPalette={"blue"} variant="surface">Ir a preguntas</Button>
      </Link>
    </ChakraProvider>
  );
};

export default BtnQuest;
