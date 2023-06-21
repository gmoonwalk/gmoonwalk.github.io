import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "time/": 
  [
    {
      text: "时间管理",
      icon: "book",
      prefix: "time/",
      children: "structure",
    },
  ],
});
// export const zhSidebar = sidebar(
//   [
//   {
//     text: "指南",
//     link: "/time/",
//     icon: "lightbulb",
//     children: "structure",
//     // 仅在 `/zh/guide/` 激活
//     activeMatch: "^/time",
//   },
// ]
// );
