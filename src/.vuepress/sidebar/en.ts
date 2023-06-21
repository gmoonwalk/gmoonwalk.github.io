import { sidebar } from "vuepress-theme-hope";

// export const enSidebar = sidebar({
//   "/en/": [
//     "",
//     {
//       text: "Demo",
//       icon: "laptop-code",
//       prefix: "demo/",
//       link: "demo/",
//       // children: "structure",
//       activeMatch: "^/demo",
//     },
//     {
//       text: "Articles",
//       icon: "book",
//       prefix: "posts/",
//       children: "structure",
//     },
//     "intro",
//     "slides",
//   ],
// });

export const enSidebar = sidebar(
{
  "/en/demo/": [
    {
      text: "Demo",
      icon: "laptop-code",
      // prefix: "/",
      link: "/en/demo/",
      children: "structure",
  },
  ],

  "/posts/": [
    "" /* /bar/ */,
    "three" /* /bar/three.html */,
    "four" /* /bar/four.html */,
  ],
}
);
