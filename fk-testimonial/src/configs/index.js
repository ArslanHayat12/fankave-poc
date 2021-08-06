import { beviBookConfigs } from "./bevi";

export const configs = window.self.ctag == "bevi" ? beviBookConfigs : "";
