import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "时间管理",
      icon: "book",
      prefix: "time/",
      children: "structure",
    },
  ],
});
