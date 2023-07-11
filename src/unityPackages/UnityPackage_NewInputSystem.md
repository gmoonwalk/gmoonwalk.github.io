---
icon: pen-to-square
date: 2023-07-07 2:00:00
order: 2
category:
  - 游戏开发
tag:
  - unity
---
# Unity Package简评：New Input System

[https://docs.unity3d.com/Packages/com.unity.inputsystem@1.6/manual/index.html](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.6/manual/index.html)

输入操作的基础组件，将用户的操作封装为Action，每个Action可以为不同操作设备绑定不同的按键操作。提供大量设置项，interactions、Processors等，实现丰富行为。Action回调提供详细的操作信息。

优点：对跨平台、多操作设备支持非常好。与Unity完美结合。

缺点：对触屏操作支持不够完善，Pin、多指一些复杂操作需要编写一些代码进行二次封装。