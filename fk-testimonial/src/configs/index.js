import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";

const theme = () => {
  switch (window.self.ctag) {
    case "bevi":
      return beviBookConfigs;
    case "default":
      return defaultConfigs;
    case "cisco":
      return ciscoConfig;
  }
};

const themeConfigs = theme();
export default themeConfigs;
