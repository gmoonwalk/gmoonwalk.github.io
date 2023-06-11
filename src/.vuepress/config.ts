import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Moonwalk",
      description: "Moonwalk的个人播客。",
      
    },
    "/en/": {
      lang: "en-US",
      title: "Moonwalk",
      description: "This is Moonwalk's blog.",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
