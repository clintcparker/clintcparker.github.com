---
layout: post
title: "How Yield Works"
date: 2016-09-11T13:55:00-07:00
---

This code should work: 


{% highlight csharp %}
IEnumerable<T> ShouldWork<T>(T  obj)
{    
    if (!obj is IEnumerable<T>)
    {
        yield return obj;
    }
    return (IEnumerable<T>) obj; 
}
{% endhighlight %}

But it doesn't.

I thought it would work. I like using `yield` to take full advantage of delayed enumeration, rather than creating new lists or arrays all the time. 

Everything looks right; the return types are good. Except it won't compile. You get a nice message about having to use `yield` inside an iterator when trying to return `(IEnumerabl<T>)obj` directly.

Don't try `yield return (IEnumerable<T>)obj`. That will do exactly what you'd think. It won't compile either, because now the return types don't match, because `yield return (IENumerable<T>)obj` needs a method return type of `IEnumerable<IEnumerable<T>>`.

So what to do? 

Obviously, try `yield break`. Because nothing else is making sense at this point. But of course, that's not what `yield break` is for in the least, so it doesn't work. Yay, not completely crazy. 

This issue didn't come up for me until I was trying to combine recursion & LINQ-expressions. And was stumped. Googling the motivator (LINQ and recursion) yielded (pun intended) no valuable results.

I grabbed the nearest .NET nerd of my colleagues, and went straight to the whiteboard. In doing so, I realized that recursion has nothing to do with this not compiling (still not crazy!). On the other hand I still had to convince my colleague that the code wouldn't compile. (He went thru literally the same steps I did. Again, not crazy).

So we seem to have found a cool nugget in the compiler, that seems to say, "if you want to `yield return` once in a method, you must `yield` all other returns in that method." OK. That actually kind of makes sense. Delayed enumeration would mean that the compiler is wanting to deal w/ things granularly.

My (sad hack of a) solution: Fake the `yield`.


{% highlight csharp %}
IEnumerable<T> DoesActuallyWork<T>(T  obj)
{ 
    if (!obj is IEnumerable<T>)
    {
        return FakeYield(obj);
    }
    return (IEnumerable<T>) obj; 
}

IEnumerable<T> FakeYield<T>(T obj)
{
    yield return obj.
}
{% endhighlight %}

All that to avoid explicitly instantiating lists.