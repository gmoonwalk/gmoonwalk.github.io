---
icon: pen-to-square
date: 2023-06-12
category:
  - 趣味科技
tag:
  - git
  - github
---
# 为多个github账号配置ssh keys

最近遇到这样的问题，有两个github账号，一个是个人账号，另一个是公司账号，而我需要在一台电脑上同时使用它们以ssh的方式读写github repo。而相同的ssh key是不能配置到两个github后台设置的，怎么样才能同时使用两个账号，而又不用每次进行身份认证呢？

实现方法概括如下：

1. 生成一个新的ssh key
2. 新的ssh key加入到ssh-agent，公钥加入到github后台设置
3. 创建ssh config文件，增加一个github.com的host别名，并为其指定ssh key
4. 修改git repo的remote为host别名地址，身份验证时自动通过ssh config切换到指定的ssh key就可以得到正确的授权了

## 详细步骤

### 新建ssh key

直接参考github文档：

[github文档：Generate a new ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" # 输入新账号的邮箱
# 提示指定文件名，直接回车就以id_ed25519命名
# 提示指定密码，可以直接回车留空
```
操作完成后，查看.ssh目录新增了秘钥id_ed25519和公钥id_ed25519.pub。位于：`~/.ssh/`；Windows在`C:\Users\{your username}\.ssh` {your username}表示自己的用户名。

### ssh key加入到ssh-agent

同样参考上面的github文档

需要注意，Win10使用PowerShell时，ssh-add命令可能报错，如下：

```bash
ssh-add -l
#报错： 
Error connecting to agent: No such file or directory

#检查ssh-agent服务是否启动成功
get-service ssh-agent
# 输出：
Status   Name               DisplayName
------   ----               -----------
Stopped  ssh-agent          OpenSSH Authentication Agent

#发现ssh-agent服务状态为 stopped,启动服务。需要使用管理员权限打开PowerShell
Set-Service -Name ssh-agent -StartupType Manual
Start-Service ssh-agent

#再次执行命令，查看已经加入的ssh keys，不报错就表示成功
ssh-add -l

#ssh key加入ssh-agent
ssh-add ~/.ssh/id_ed25519
```

> 特别注意：需要使用管理员权限打开PowerShell

参考官方文档：[ssh key加入到账号设置](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account)

1. 进入Settings用户设置
2. SSH and GPG keys选项，点击New SSH key 或 Add SSH key
3. 输入名字，内容打开id_ed25519.pub文件进行复制。

### ssh config

在.ssh目录创建config文件，按下面内容填写

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa

Host mk.github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
```

第一个Host设置是默认使用的主账号；第二个Host设置是个人账号，别名为mk.github.com，这里的mk可以自行改写。

### 修改git repo的remote地址

我们从clone的remote地址默认为`git@github.com:gmoonwalk/gmoonwalk.github.io.git`的形式，将所有需要使用个人账号的repo远端地址修改为mk.github.com域名，例如：`git@mk.github.com:gmoonwalk/gmoonwalk.github.io.git`。

这样，这些mk.github.com域名通过ssh访问时，就会自动使用id_ed25519这个ssh key进行授权了。

修改remote地址，参考
```bash
git remote remove origin # 先删除原有remote
git remote add origin git@mk.github.com:gmoonwalk/gmoonwalk # 设置新的remote
```