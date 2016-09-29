---
layout: post
title: "VBScript Conditional Includes"
date: 2014-03-21T11:16:00-07:00
---


This is a nasty one to track down in production, so I'm going to show you here.

VBScript has a fun way of interpreting include references that are nested inside an if statement. It will load all include references. If you have different functions, with the same name, it will use the second one.

Example

myTest_inc1.asp:

{% highlight vbscript %}
<%
Response.Write "<br/>Function 1 loaded...<br/>"

function myFunc(int1, int2)
    Response.Write "<br/>Function 1 executing...<br/>"
    myFunc = int1 * int2
end function 
%>
{% endhighlight %}


myTest_inc2.asp:


{% highlight vbscript %}
<%
Response.Write "<br/>Function 2 loaded...<br/>"

function myFunc(int1, int2)
    Response.Write "<br/>Function 2 executing...<br/>"
    myFunc = int1 + int2
end function
%>
{% endhighlight %}

myTest.asp:


{% highlight vbscript %}
<%
    if (true) then
        Response.Write "<br/>Case 1 executing...<br/>"
%>

<!-- #include file="myTest_inc1.asp" -->

<% 
    else
        Response.Write "<br/>Case 2 executing...<br/>"
%>

<!-- #include file="myTest_inc2.asp" -->

<%
    end if
    
    Response.Write myFunc(3,3)
%>
{% endhighlight %}


The output of myTest.asp is:

Case 1 executing...

Function 1 loaded...

Function 2 executing...

6





Thanks for reading.