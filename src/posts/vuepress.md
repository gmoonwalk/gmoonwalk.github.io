---
icon: pen-to-square
date: 2023-06-11
category:
  - 趣味科技
tag:
  - vuepress
  - web
---
# 使用VuePress搭建个人网站

首先简单概括一下这个技术方案，先有一个整体的概念：

使用Markdown编写文字内容，通过VuePress将其生成静态网页，最后上传到Github通过Github Pages服务托管网站。

特点：

* 免费。例如：github, gitlab等等很多网站都提供免费的托管服务；
* 容易部署。不需要进行服务器配置/搭建数据库/管理依赖程序等等，生成.html文件即可。
* 美观。VuePress提供了强大的功能支持，Markdown扩展/美观动态的web页支持。

接下来结合搭建步骤，进行详细解释。

::: info 静态网页
什么是静态网页？其内容是预先制作好的不会动态改变。与之对应的就是动态网页，其中的内容是动态的通过服务器程序动态填充的。比如：搜索引擎Google;购物网站taobao；社区论坛，里面的内容可以随着用户的输入或者修改动态变化。

> 如果对Markdown不了解可以自行通过搜索引擎学习，有大量现有优质资料。
:::

## VuePress

[VuePress 2.0官网](https://v2.vuepress.vuejs.org/zh/)，是Vue驱动的静态网站生成器。官网有详尽的说明文档，可以参考。

这里推荐使用[VuePress的Hope插件](https://theme-hope.vuejs.press/)，安装非常简单，功能齐全、强大并且开箱即用。下面罗列一下使用步骤：

1. 安装nodejs最新文档版
2. 安装pnpm包管理工具
3. 创建工程，`pnpm create vuepress-theme-hope [dir]`其中dir就是工程的目录名。根据脚本提示，选择适合自己的选项。
4. 完成后可直接运行，或者在工程目录运行`pnpm docs:dev`命令运行，就可以在本地访问静态网站了。

## 定制

介绍一下工程的目录结构

```
├─ src
│   ├─ .vuepress #vuepress有关，配置信息等
│   │  ├─ config.ts
│   │  ├─ theme.ts
│   │  ├─ ...
│   ├─ zh # 多语言目录，里面与最外层的.md有关文件结构一致
│   ├─ posts # .md文件夹，可以自由组织目录结构
│   │  ├─ *.md
│   │  ├─ ...
│   ├─ *.md
├─ package.json # 包含工程信息，依赖内容，可执行的脚本等；
```

src里面的.md文件会被生成为各种静态网页，VuePress支持多语言，其中`zh`即为多语言目录。

.vuepress中包含vuepress有关的配置脚本，其中：
1. config.ts是vuepress的配置脚本
2. theme.ts是主题有关的配置脚本，可以在这里配置作者、主页信息、关联链接等等
3. sidebar和navbar分别是侧边栏和导航栏的配置

修改了基本的网站、作者信息以后就可以直接开始使用了。详细的配置参数参考官网的文档：[主题配置](https://theme-hope.vuejs.press/zh/config/theme/basic.html)

### Frontmatter

在markdown文件的顶部，可以使用一对'---'包含关于页面的配置信息，来辅助页面的渲染，这就是Frontmatter。例如：

```
---
icon: pen-to-square
date: 2023-06-11
category:
  - 趣味科技
tag:
  - vuepress
  - web
---
```

其内容为Yaml格式，可以定义文章分类、tag、创建日期、图标等等信息。更多的设置项查看详细的说明文档：[Frontmatter](https://theme-hope.vuejs.press/zh/config/frontmatter/info.html)

::: info 常用配置
这里我用来以下几个配置
* category文章分类
* tag文章标签
* date创建日期
* article默认为true，false表示不在播客列表显示。例如intro.md
:::

## 部署

Github Pages可以免费部署静态网页，支持创建一个用户的个人网站；开源的项目网站数量不限；使用非常简单：

1. 创建一个名为：*username*.github.io 的仓库，username是github的用户名。
2. 仓库根目录有一个index.html，这就是网站的主页。
3. 使用浏览器范围*username*.github.io，就打开第2步中的index.html了。

所以，只需要把生成的静态网站内容提交到指定命名的仓库就完成了网站部署。

在工程目录执行，`pnpm docs:build`命令，就可以生成静态网站到`src/.vuepress/dist`，把它提交到上面的仓库即可。

### 自动化部署

但是每次手动上传是非常繁琐的，可以利用Github Action自动部署，设置完成后只需要修改markdown文件就可以自动完成网站的更新，可以使用Github网页或者客户端随时随地的编辑发布网站内容。

hope主题在创建工程的时候，选择使用Github Pages部署，会自动创建自动化部署的workflow文件在`.github/workflows/deploy-docs.yml`。

#### Github Action

是对开源项目免费的CI/CD工具，如果不了解CI/CD可以把它理解为，当repo变化的时候可以自动触发一台服务器clone repo并执行自定义的程序。

比如，vuepress的自动部署就是：

1. 每次repo有push内容，在一台服务器上clone工程
2. 安装vuepress必要的系统环境，nodejs/pnpm/vuepress等
3. 执行`pnpm docs:build`命令生成网站
4. 将`src/.vuepress/dist`内容推送到repo的gh-pages分支


::: info Action可能的问题
1. 安装pnpm报错未指定版本，增加version设置
    ```
      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          run_install: true
    ```
2. 对仓库没有访问权限，git exits with 128
    在repo的GitHub Actions设置项中，Workflow Permissions选择read and write premissions，增加读写权限。
:::

准备就绪，可以将工程提交到Github了，参考命令：
```bash
# cd到vuepress工程目录
cd ./gmoonwalk.github.io
git init
git remote add origin git@github.com:gmoonwalk/gmoonwalk.github.io.git
git branch -M main #修改分支名称
git push -u origin main
```
提交后，观察github repo中的Action页面，自动部署的Action就开始执行，正常的话网站发布就成功了。

### Pages设置

最后，网站的内容成功推送到gh-pages分支，打开repo的Settings/Pages在Build and deployment的Branch选项中选择gh-pages分支。稍等几分钟后，访问`gmoonwalk.github.io.git`，个人网站就正式运行起来了。

## 评论系统

我选用的Giscus，是一个基于 GitHub Discussion 的评论系统。启用很简单，参考官方文档教程即可：[Giscus usage](https://theme-hope.vuejs.press/zh/guide/feature/comment.html#giscus)

1. 直接在pages的repo设置中，开启discussion功能；
2. github安装Giscus应用，填写repo名，类型等，获取Giscus的参数；

获得参数后，修改`.vuepress/theme.ts`文件，如：
```javascript
  plugins: {
    ...
    comment: {
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "gmoonwalk/gmoonwalk.github.io", // discuss的repo
      repoId: "repoidParam", //获取的参数
      category: "Announcements",
      categoryId: "dddff" //获取的参数
    },
```
