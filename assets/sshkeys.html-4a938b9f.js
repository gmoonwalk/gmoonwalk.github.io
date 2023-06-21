import{_ as t,r as o,o as d,c as r,a as e,b as s,e as i,f as n}from"./app-1e9d6dae.js";const l={},c=n('<h1 id="为多个github账号配置ssh-keys" tabindex="-1"><a class="header-anchor" href="#为多个github账号配置ssh-keys" aria-hidden="true">#</a> 为多个github账号配置ssh keys</h1><p>最近遇到这样的问题，有两个github账号，一个是个人账号，另一个是公司账号，而我需要在一台电脑上同时使用它们以ssh的方式读写github repo。而相同的ssh key是不能配置到两个github后台设置的，怎么样才能同时使用两个账号，而又不用每次进行身份认证呢？</p><p>实现方法概括如下：</p><ol><li>生成一个新的ssh key</li><li>新的ssh key加入到ssh-agent，公钥加入到github后台设置</li><li>创建ssh config文件，增加一个github.com的host别名，并为其指定ssh key</li><li>修改git repo的remote为host别名地址，身份验证时自动通过ssh config切换到指定的ssh key就可以得到正确的授权了</li></ol><h2 id="详细步骤" tabindex="-1"><a class="header-anchor" href="#详细步骤" aria-hidden="true">#</a> 详细步骤</h2><h3 id="新建ssh-key" tabindex="-1"><a class="header-anchor" href="#新建ssh-key" aria-hidden="true">#</a> 新建ssh key</h3><p>直接参考github文档：</p>',7),h={href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent",target:"_blank",rel:"noopener noreferrer"},m=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> ed25519 <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span> <span class="token comment"># 输入新账号的邮箱</span>
<span class="token comment"># 提示指定文件名，直接回车就以id_ed25519命名</span>
<span class="token comment"># 提示指定密码，可以直接回车留空</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作完成后，查看.ssh目录新增了秘钥id_ed25519和公钥id_ed25519.pub。位于：<code>~/.ssh/</code>；Windows在<code>C:\\Users\\{your username}\\.ssh</code> {your username}表示自己的用户名。</p><h3 id="ssh-key加入到ssh-agent" tabindex="-1"><a class="header-anchor" href="#ssh-key加入到ssh-agent" aria-hidden="true">#</a> ssh key加入到ssh-agent</h3><p>同样参考上面的github文档</p><p>需要注意，Win10使用PowerShell时，ssh-add命令可能报错，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-add <span class="token parameter variable">-l</span>
<span class="token comment">#报错： </span>
Error connecting to agent: No such <span class="token function">file</span> or directory

<span class="token comment">#检查ssh-agent服务是否启动成功</span>
get-service ssh-agent
<span class="token comment"># 输出：</span>
Status   Name               DisplayName
------   ----               -----------
Stopped  ssh-agent          OpenSSH Authentication Agent

<span class="token comment">#发现ssh-agent服务状态为 stopped,启动服务。需要使用管理员权限打开PowerShell</span>
Set-Service <span class="token parameter variable">-Name</span> ssh-agent <span class="token parameter variable">-StartupType</span> Manual
Start-Service ssh-agent

<span class="token comment">#再次执行命令，查看已经加入的ssh keys，不报错就表示成功</span>
ssh-add <span class="token parameter variable">-l</span>

<span class="token comment">#ssh key加入ssh-agent</span>
ssh-add ~/.ssh/id_ed25519
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>特别注意：需要使用管理员权限打开PowerShell</p></blockquote>`,7),u={href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account",target:"_blank",rel:"noopener noreferrer"},p=n(`<ol><li>进入Settings用户设置</li><li>SSH and GPG keys选项，点击New SSH key 或 Add SSH key</li><li>输入名字，内容打开id_ed25519.pub文件进行复制。</li></ol><h3 id="ssh-config" tabindex="-1"><a class="header-anchor" href="#ssh-config" aria-hidden="true">#</a> ssh config</h3><p>在.ssh目录创建config文件，按下面内容填写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa

Host mk.github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),g={href:"http://xn--mk-tz2c58m4wc.github.com",target:"_blank",rel:"noopener noreferrer"},b=n(`<h3 id="修改git-repo的remote地址" tabindex="-1"><a class="header-anchor" href="#修改git-repo的remote地址" aria-hidden="true">#</a> 修改git repo的remote地址</h3><p>我们从clone的remote地址默认为<code>git@github.com:gmoonwalk/gmoonwalk.github.io.git</code>的形式，将所有需要使用个人账号的repo远端地址修改为mk.github.com域名，例如：<code>git@mk.github.com:gmoonwalk/gmoonwalk.github.io.git</code>。</p><p>这样，这些mk.github.com域名通过ssh访问时，就会自动使用id_ed25519这个ssh key进行授权了。</p><p>修改remote地址，参考</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote remove origin <span class="token comment"># 先删除原有remote</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@mk.github.com:gmoonwalk/gmoonwalk <span class="token comment"># 设置新的remote</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github的ssh访问方式" tabindex="-1"><a class="header-anchor" href="#github的ssh访问方式" aria-hidden="true">#</a> Github的SSH访问方式</h2><p>简单介绍一下github ssh的访问方式。</p><p>ssh是一种安全访问的协议，Secure Shell，常用来进行某个主机的远程访问，例如：</p><p><code>ssh root@myhost.com</code></p><p>其中root是用户名，myhost.com指对应的主机名，回车后，提示输入密码。密码正确，就验证了用户身份为root对主机进行访问。</p><p>github的ssh访问方式也是如此，比如地址<code>git@github.com:gmoonwalk/gmoonwalk.github.io.git</code>，git就是用户名，后面的部分是具体的资源。然后通过ssh key本地持有私钥，公钥提交到github后台设置，以这样的方式完成身份认证。通过后，就可以得到repo的读写权限。</p>`,11);function v(k,y){const a=o("ExternalLinkIcon");return d(),r("div",null,[c,e("p",null,[e("a",h,[s("github文档：Generate a new ssh key"),i(a)])]),m,e("p",null,[s("参考官方文档："),e("a",u,[s("ssh key加入到账号设置"),i(a)])]),p,e("p",null,[s("第一个Host设置是默认使用的主账号；第二个Host设置是个人账号，"),e("a",g,[s("别名为mk.github.com"),i(a)]),s("，这里的mk可以自行改写。")]),b])}const f=t(l,[["render",v],["__file","sshkeys.html.vue"]]);export{f as default};
