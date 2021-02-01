import React from "react";
import AppProvider from './hooks';

import Routes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
}

export default App;
