import { sidebar } from "vuepress-theme-hope";

// export const zhSidebar = sidebar({
//   "time/": 
//   [
//     {
//       text: "时间管理",
//       icon: "book",
//       prefix: "time/",
//       children: "structure",
//     },
//   ],
// });


export const zhSidebar = sidebar(
  {
    "/kcp/": [
      {
        text: "KCP解读",
        icon: "laptop-code",
        link: "/kcp/",
        children: "structure",
      },
    ],
  
    "/time/": [
      {
        text: "时间管理",
        icon: "laptop-code",
        link: "/time/",
        children: "structure",
      },
    ],
  }
  );