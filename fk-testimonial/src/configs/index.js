import beviBookConfigs from "./beviTheme";
import olympicsConfigs from "./olympicsTheme";

const theme = () => {
  switch (window.self.ctag) {
    case "bevi":
      return beviBookConfigs;
    case "olympics":
      return olympicsConfigs;
    case "cisco":
      return ciscoConfig;
  }
};

const themeConfigs = theme();
export default themeConfigs;
