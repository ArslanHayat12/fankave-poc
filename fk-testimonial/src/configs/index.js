import deepmerge from "deepmerge";

import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";
import demoConfigs from "./demoTheme";
import postalConfigs from "./postalTheme";
import honeyBookConfigs from "./honeyBookTheme";
import proveConfigs from "./proveTheme";
import sproutConfigs from "./sproutTheme";

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const theme = () => {
  switch (window.self.ctag) {
    case "bevi":
      return deepmerge(demoConfigs, beviBookConfigs, {
        arrayMerge: overwriteMerge,
      });
    case "default":
      return deepmerge(demoConfigs, defaultConfigs, {
        arrayMerge: overwriteMerge,
      });
    case "honeybook":
      return deepmerge(demoConfigs, honeyBookConfigs, {
        arrayMerge: overwriteMerge,
      });
    case "demo":
      return demoConfigs;
    case "postal":
      return deepmerge(demoConfigs, postalConfigs, {
        arrayMerge: overwriteMerge,
      });
    case "prove":
      return deepmerge(demoConfigs, proveConfigs, {
        arrayMerge: overwriteMerge,
      });
    case "sprout":
      return deepmerge(demoConfigs, sproutConfigs, {
        arrayMerge: overwriteMerge,
      });
    default:
      return demoConfigs;
  }
};

const themeConfigs = theme();
export default themeConfigs;
