import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom/client";

import { App } from "./App";

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: "semibold",
        fontSize: "sm",
      },
    },
  },
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
