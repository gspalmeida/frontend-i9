import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import AppProvider from './hooks';

import Routes from "./routes";

function App() {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  );
}

export default App;
