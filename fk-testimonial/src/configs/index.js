import beviBookConfigs from "./beviTheme";
import defaultConfigs from "./defaultTheme";
import demoConfigs from "./demoTheme";
import postalConfigs from "./postalTheme";
import honeyBookConfigs from "./honeyBookTheme";
import proveConfigs from "./proveTheme";

const theme = () => {
    switch (window.self.ctag) {
        case "bevi":
            return beviBookConfigs;
        case "default":
            return defaultConfigs;
        case "honeybook":
            return honeyBookConfigs;
        case "demo":
            return demoConfigs;
        case "postal":
            return postalConfigs;
        case "prove":
            return proveConfigs;
    }
};

const themeConfigs = theme();
export default themeConfigs;
