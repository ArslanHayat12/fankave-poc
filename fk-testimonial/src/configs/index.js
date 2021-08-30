import deepmerge from "deepmerge";

import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";
import demoConfigs from "./demoTheme";
import postalConfigs from "./postalTheme";
import honeyBookConfigs from "./honeyBookTheme";
import proveConfigs from "./proveTheme";

const theme = () => {
  switch (window.self.ctag) {
    case "bevi":
      return deepmerge(demoConfigs, beviBookConfigs);
    case "default":
      return deepmerge(demoConfigs, defaultConfigs);
    case "honeybook":
      return deepmerge(demoConfigs, honeyBookConfigs);
    case "demo":
      return demoConfigs;
    case "postal":
      return deepmerge(demoConfigs, postalConfigs);
    case "prove":
      return deepmerge(demoConfigs, proveConfigs);
  }
};

const themeConfigs = theme();
export default themeConfigs;
