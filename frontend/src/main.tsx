import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pages/auth/login";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <ApolloProvider
          client={
            new ApolloClient({
              uri: "http://localhost:4000/",
              cache: new InMemoryCache(),
            })
          }
        >
          <RouterProvider router={router} />
        </ApolloProvider>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
