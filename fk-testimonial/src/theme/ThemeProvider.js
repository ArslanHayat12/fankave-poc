import React from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

export default function ThemeProvider(props) {
  const { styledTheme, children } = props;
  return (
    <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
  );
}
