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

> 如果对Markdown不了解可以自行通过搜索引擎学习，有大量现有优质资料。

## 静态网页

什么是静态网页呢？与之对应的就是动态网页，其中的内容是动态的通过服务器程序动态填充的。比如：搜索引擎Google;购物网站taobao；社区论坛，里面的内容可以随着用户的输入或者修改动态变化。而静态网页与之相反，其内容是预先制作好的不会动态改变。

VuePress

VuePress.Hope theme

操作脚本

Formatter

评论系统

## 部署

git

Github Action

Workflow编写

Github设置


## 使用

编写.md，提交push，Action自动部署。