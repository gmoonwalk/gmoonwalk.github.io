const e=JSON.parse('{"key":"v-4a499ec2","path":"/kcp/kcp_2%20d0cde777b62b40fcaae57b35fc555e09.html","title":"KCP解读：基础消息收发","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2023-06-19T02:00:00.000Z","category":["计算机网络"],"tag":["kcp"],"description":"KCP解读：基础消息收发 接下来会涉及源码解读，这里以C#版本为基础讲解。 kcp已经被port到很多语言和平台，它们都是C语言版本的移植，正常来说为了移植容易，保持一致性。方法、变量命名是一样的，区别不大。 Segment 应用层发送的数据可能是一段文本、编码格式如protobuf、音频、视频，本质上它们都是二进制数据(一般是bytes数组)，我们叫它原始数据。 原始数据输入给kcp后，kcp对数据进行封装：增加消息头；超长数据进行分段等，封装后的数据叫做Segment。有一些不同的叫法，数据段、数据包、网络包等等，为了防止歧义，以下统一叫做数据包或简称包。数据包有包头和包体，包体就是原始数据。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/kcp/kcp_2%20d0cde777b62b40fcaae57b35fc555e09.html"}],["meta",{"property":"og:site_name","content":"Moonwalk"}],["meta",{"property":"og:title","content":"KCP解读：基础消息收发"}],["meta",{"property":"og:description","content":"KCP解读：基础消息收发 接下来会涉及源码解读，这里以C#版本为基础讲解。 kcp已经被port到很多语言和平台，它们都是C语言版本的移植，正常来说为了移植容易，保持一致性。方法、变量命名是一样的，区别不大。 Segment 应用层发送的数据可能是一段文本、编码格式如protobuf、音频、视频，本质上它们都是二进制数据(一般是bytes数组)，我们叫它原始数据。 原始数据输入给kcp后，kcp对数据进行封装：增加消息头；超长数据进行分段等，封装后的数据叫做Segment。有一些不同的叫法，数据段、数据包、网络包等等，为了防止歧义，以下统一叫做数据包或简称包。数据包有包头和包体，包体就是原始数据。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-21T03:17:40.000Z"}],["meta",{"property":"article:author","content":"Moonwalk"}],["meta",{"property":"article:tag","content":"kcp"}],["meta",{"property":"article:published_time","content":"2023-06-19T02:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-21T03:17:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"KCP解读：基础消息收发\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-19T02:00:00.000Z\\",\\"dateModified\\":\\"2023-06-21T03:17:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Moonwalk\\",\\"url\\":\\"https://gmoonwalk.github.io\\"}]}"]]},"headers":[{"level":2,"title":"Segment","slug":"segment","link":"#segment","children":[{"level":3,"title":"包头","slug":"包头","link":"#包头","children":[]}]},{"level":2,"title":"TCP的确认应答机制","slug":"tcp的确认应答机制","link":"#tcp的确认应答机制","children":[{"level":3,"title":"超时重传","slug":"超时重传","link":"#超时重传","children":[]}]},{"level":2,"title":"KCP消息发送","slug":"kcp消息发送","link":"#kcp消息发送","children":[{"level":3,"title":"flush方法","slug":"flush方法","link":"#flush方法","children":[]}]},{"level":2,"title":"消息接收","slug":"消息接收","link":"#消息接收","children":[{"level":3,"title":"ACK","slug":"ack","link":"#ack","children":[]}]},{"level":2,"title":"超时重发","slug":"超时重发","link":"#超时重发","children":[]}],"git":{"createdTime":1687317460000,"updatedTime":1687317460000,"contributors":[{"name":"zhouyue","email":"zhouyue@camel4u.com","commits":1}]},"readingTime":{"minutes":6.8,"words":2039},"filePathRelative":"kcp/kcp_2 d0cde777b62b40fcaae57b35fc555e09.md","localizedDate":"2023年6月19日","excerpt":"<h1> KCP解读：基础消息收发</h1>\\n<p>接下来会涉及源码解读，这里以C#版本为基础讲解。</p>\\n<blockquote>\\n<p>kcp已经被port到很多语言和平台，它们都是C语言版本的移植，正常来说为了移植容易，保持一致性。方法、变量命名是一样的，区别不大。</p>\\n</blockquote>\\n<h2> Segment</h2>\\n<p>应用层发送的数据可能是一段文本、编码格式如protobuf、音频、视频，本质上它们都是二进制数据(一般是bytes数组)，我们叫它<strong>原始数据</strong>。</p>\\n<p>原始数据输入给kcp后，kcp对数据进行封装：增加消息头；超长数据进行分段等，封装后的数据叫做<strong>Segment</strong>。有一些不同的叫法，数据段、数据包、网络包等等，为了防止歧义，以下统一叫做<strong>数据包或简称包</strong>。数据包有包头和包体，包体就是原始数据。</p>","autoDesc":true}');export{e as data};
