import deepmerge from "deepmerge";

import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";
import demoConfigs from "./demoTheme";
import postalConfigs from "./postalTheme";
import honeyBookConfigs from "./honeyBookTheme";
import proveConfigs from "./proveTheme";

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
  }
};

const themeConfigs = theme();
export default themeConfigs;
