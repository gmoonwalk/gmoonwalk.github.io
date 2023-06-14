---
icon: pen-to-square
date: 2023-06-14
category:
  - 编程语言
tag:
  - c#
---

# C# `Span<T>` Struct

详情可以浏览 [官方文档](https://learn.microsoft.com/en-us/dotnet/api/system.span-1?view=net-7.0)

这个结构，提供了一种类型安全且内存安全的方式来表示连续的任意内存区域。它是如何体现这些特性的呢？

- Type-Safety：`Span<T>`是一个泛型结构体，这样它在编译期就强制的类型安全，否则会编译错误。你只能用T表示的类型来处理内存，不会出现类型错误导致的运行时错误。
- 边界检测：它会检测表示内存的边界，如果超出合法范围会抛出异常，但是不会发生异常内存访问导致的crash等问题。
- Stack-only：只能在栈上使用，这就表示它不会产生内存泄露，一定会被合理释放。
- 支持切片：比如可以表示某数组的一部分内容，并且不需要进行内存复制，非常高效。
- 可以应用于大量的内存结构，适用性广泛。

下面摘取一些示例代码进行演示：

表示数组，并进行内存访问：

```csharp
var array = new byte[100];
var arraySpan = new Span<byte>(array);

byte data = 0;
for (int ctr = 0; ctr < arraySpan.Length; ctr++)
    arraySpan[ctr] = data++;

int arraySum = 0;
foreach (var value in array)
    arraySum += value;

Console.WriteLine($"The sum is {arraySum}");
```

Slice功能：

```csharp
using System;

class Program2
{
    static void Run()
    {
        string contentLength = "Content-Length: 132";
        var length = GetContentLength(contentLength.ToCharArray());
        Console.WriteLine($"Content length: {length}");
    }

    private static int GetContentLength(ReadOnlySpan<char> span)
    {
        var slice = span.Slice(16);
        return int.Parse(slice);
    }
}
```

`GetContentLength` 这个接口不会产生memory alloc，通过span.slice截取了最后的数字部分，并且解析成int。