import React from "react";

import PageWrapper from "./components/PageWrapper/PageWrapper";
import Widget from "./components/Widget/Widget";

import themeConfigs from "./theme";
import ThemeProvider from "./theme/ThemeProvider";

import "./App.css";

function App() {
  //context wrapping
  return (
    <ThemeProvider styledTheme={themeConfigs}>
      <PageWrapper children={<Widget />}></PageWrapper>
    </ThemeProvider>
  );
}

export default App;
