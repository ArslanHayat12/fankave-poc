import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";
import postalConfigs from "./postalTheme";

const theme = () => {
  switch (window.self.ctag) {
    case "bevi":
      return beviBookConfigs;
    case "default":
      return defaultConfigs;
    case "postal":
      return postalConfigs;
    default:
      return defaultConfigs;
  }
};

const themeConfigs = theme();
export default themeConfigs;
