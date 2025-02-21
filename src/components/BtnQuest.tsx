"use client";

import { Button, Link } from "@chakra-ui/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const BtnQuest = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Link href="/otra-pagina">
        <Button>Ir a preguntas</Button>
      </Link>
    </ChakraProvider>
  );
};

export default BtnQuest;
