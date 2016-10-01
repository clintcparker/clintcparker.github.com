---
layout: post
title: "C# Obfuscation"
date: 2016-10-01T12:02:45-07:00
---

You can use the underscore to write ridiculous code.

`__` is a valid class name. `__` is a valid namespace. `__()` is a valid method. And, `__` is a valid property.


I stumbled upon this a few years ago , but hadn’t gotten around to writing it down. It's really fun to play with. I thinkt the next step is to create an obfuscator extension.

Here's a simple class from when I was teaching intro to C# and demonstrating async and await.

```csharp
using System.IO;
using System.Threading.Tasks;

namespace A_A.Library
{
    public class FileAccess
    {
        public async Task<int> GetLength(string filePath)
        {
            var sr = new StreamReader(filePath);
            var chars = sr.ReadToEnd();
            return chars.Length;
        }

        public async Task<int> GetLines(string bigTxt)
        {
            int lines = 0;
            var sr = new StreamReader(bigTxt);
            while (!sr.EndOfStream)
            {
                await sr.ReadLineAsync();
                lines++;
            }
            return lines;
        }
    }
}
```

Here's it is again, obfuscated. Still compiles, still valid C#. 

```csharp

using System.IO;
using System.Threading.Tasks;

namespace __
{
    public class ___
    {
        public async Task<int> ____(string ___)
        {
            var _ = new StreamReader(___);
            var __ = _.ReadToEnd();
            return __.Length;
        }

        public async Task<int> _____(string ___)
        {
            int _ = 0;
            var __ = new StreamReader(___);
            while (!__.EndOfStream)
            {
                await __.ReadLineAsync();
                _++;
            }
            return _;
        }
    }
}
```

Thanks for reading. 

P.S. Who want's to help me write the obfuscator?
