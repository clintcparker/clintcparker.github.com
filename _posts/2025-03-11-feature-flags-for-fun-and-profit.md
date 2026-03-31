---
layout: post
title: "Feature Flags for Fun & Profit"
date: 2025-03-11T11:16:00-07:00
---

*By Gerald Singleton & Clint Parker*

## Intro
Continuous integration & deployment. Automated testing. Refactoring & taking control of the monolith. Reducing cycle time. Increased uptime. Optimizing the data layer. Putting stakeholders in control. Making customers happy. 

We’ve done all that. And it was all easier with our aggressive adoption of feature flags. Using flags by default has unblocked all of the more visible initiatives we wanted to achieve. In this document, we’ll showcase what flags are (and aren’t), why we use them to the extent we do, and how you can quickly take advantage of these patterns to improve your codebases.
## Guidelines
### Not (just) for features
A common misconception is that feature flags are only for toggling application features. Development teams often tend to think that an application will have a finite number of features at any given time, and those features can be managed via configuration settings. This thinking limits the overall flexibility of your application. In our SDLC, we don't use feature flags just to toggle application features. In fact, we primarily use feature flags as a deployment tool. They enable us to deploy changes to our product frequently, purposefully, and most importantly…safely. 

### Columns vs. Layers
A foundational concept of feature flags is context vs config. Many applications use a variety of pre-production environments with their own config settings and slightly different expectations. An example would be connection strings for the different versions of the same DB. Or maybe a sandbox vs production integration dependencies. These are usually diagramed as vertical, separated by horizontal lines as layers, hence the phrase “lower environments.” Layers are expensive. There are tricks to reduce costs, but nevertheless, they are expensive. 

On the other hand, horizontal segmentations, or columns, tend to be much less expensive and dynamic. These are thought of as usage characteristics, like the number of users, geography, and account settings, which are cheap. For this purpose, we can group all the varieties of horizontal segmentation into the term “context.” Contexts don’t have to have names, nor do they need special dependencies. Contexts are unmanaged. They simply exist within the runtime space of the code.

### Context
Context is not a reserved word in this case; it's a concept. LaunchDarkly does have a specific meaning, but that’s not what this is. As mentioned, context already exists in your application. You already have settings for the application itself, organizations, users, geographies, and time/date. Contexts can be split or combined. The point is that your application can accommodate this perspective and already does. Accepting this is important because the appropriate usage of feature flags will maximize it.

Feature flags are just additional context. You should pick one to three known contexts to start with. In a B2B application, the first context you should accommodate in your flagging system is “Company ID.” The new context is flag state plus company. 
The myth of tech debt
I’m sure you’re asking yourself, “But aren’t you just increasing the technical debt in the system by adding temporary code?” The short answer is…not really. In our experience, when managed correctly, this is not a problem. When feature flags are implemented in a way in which they can be easily removed (i.e. simple conditional statements), they can (and should) be the shortest-lived code sections in the repo. With this in mind, feature flags can actually be a tool that can be used by the development team to reduce overall technical debt. Armed with this new tool, contributors are empowered to improve the code base aggressively.

### Risk mitigation
Feature flagging’s top value is as a risk mitigator. They can be used for all sorts of other things, but this should be the top priority. If you have such an amazing codebase that you prefer to fly without this safety net, congratulations, you’ve found the perfect engineering shop and should never leave!!! But in most of the engineering teams I’ve been on this hasn’t been the case. Engineers are usually working in code that has been through several development teams with varying levels of skill and backgrounds. This results in a codebase that is often brittle. This is where proper usage of feature flags can shine. Think of how inexpensive it is to add a flag to mitigate any potential risk to your application. Any side effects can be quickly reverted back to the original behavior with the simple flip of a feature flag. 

With the safety net of feature flags in place, you can do the unthinkable…test in production. Feature flags enable you to pick a context (user, company, etc.) and test that hypothesis in a real production environment. The impact would be limited to that context only, and if not, the impact can be quickly disabled without impacting the rest of the team and their deliveries. 

### Refactors unleashed
With the safety of feature flags, you can take bigger swings especially as it relates to refactoring code. This proves especially beneficial in older code bases where the system may be more brittle. You can refactor a whole vertical slice, deploying frequently and confirming along the way that the change is working in production with little to no impact to your users. If you find that a piece of refactored code that was deployed causes unintended side effects, you don’t have to go through the process of rushing to make a code fix and redeploying your code to production. It’s as simple as turning off the feature flag. You can take the time to mindfully fix the issue and continue refactoring. 

### Quality mindset / User experience first
Since nothing is now stopping the team from improving the system, quality, and intolerance for degraded user experiences can become the norm. Imagine a world where rapid delivery of value to your users is possible without the historical fear of unintended downtime. Part of the SDLC now involves verifying assumptions in production, constantly maintaining the system, and never disappointing your users. Feature flags can literally let you “swap the engine while driving down the freeway.” 

### Aggressive/Liberal usage
With all of these benefits, why not aggressively apply feature flags across your code base? The reality is that if the implementation of feature flag usage described here is going to be successful, it must become an enforced standard. It must be a requirement on pull requests that the changes be behind a feature flag. Why does it require that level of enforcement to be successful? Because change is hard, and this change in particular, requires a mindset shift that may not be easy for some engineers. In the same way, writing tests, creating documentation, or following coding standards doesn’t come easy initially. 

## Implementation examples and guidelines
Identify your flags not just by the change but also by the team and implementer. Start with a common context for your application. In B2B, the context should be the organization identifier. In B2C, geography is a great place to start.

To make sure that this point gets across, we want to repeat: “Feature flags are meant to have a short lifespan.” Ensuring that feature flags are temporary is one of the foundations of implementing the strategies outlined here.  Ignoring this foundational topic could lead to situations where you have nested feature flag implementations.  This can severely reduce the maintainability of the code base.

```csharp
public class SampleClass : ISampleClass
{
    private readonly IFeatureFlagProvider _featureFlagProvider;

    public SampleClass(IFeatureFlagProvider featureFlagProvider)
    {
        _featureFlagProvider = featureFlagProvider;
    }

    public async Task DoSomething(string inputValue)
    {
        if (_featureFlagProvider.IsEnabled(FeatureFlagEnums.FeatureFlag1)
        {
            if (_featureFlagProvider.IsEnabled(FeatureFlagEnums.FeatureFlag2)
            {
                /// Some Code Here 
            }
            else
            {
                /// Some Code Here 
            }
        }
        else
        {

        }
    }
}
```
Figure 1.1 Nested Feature Flags


One of the issues that we encountered pretty quickly when implementing feature flags was merge conflicts. In our initial implementation the FeatureFlags were defined in a single enum class. To solve this issue, the enum class was split into several partial classes with each developer having their own Enum file (FeatureFlagEnums.Dev1.cs,FeatureFlagEnums.Dev2.cs, etc). Within that class file is a partial declaration to the FeatureFlagEnums class where each developer can list the feature flags that they are working on. This gives the developer compile time notifications of potential conflicts.   


```csharp
/// Sample service class 
public class CompanyService : ICompanyService
{
    public async Task<string> DoSomethingCool(string inputValue1)
    {
        //Imagine some code here 
    }

    public async Task<string> DoSomethingCooler(string inputValue1)
    {
        //Imagine some cooler code here 
    }
}

/// This is a context object
/// It would be used to pass into the feature flag client
public class FeatureFlagContext : IFeatureFlagContext
{
    public string CompanyId { get; set; }
}

/// This class would represent your feature flag
/// management.  This could be a wrapper around an external feature flag
/// management client such as LaunchDarkly
public class FeatureFlagClient : IFeatureFlagClient
{
    public bool IsFeatureFlagEnabledForContext(string contextId, FeatureFlagEnum featureFlag)
    {
        // Call to your external flag manager here to 
        // retrieve the flag state for the given context
    }
}

/// Pseudo code implementation of the feature flag provider class 
/// This IFeatureFlagContext would contain 
public class FeatureFlagProvider : IFeatureFlagProvider
{
    private readonly IFeatureFlagContext _featureFlagContext;
    private readonly IFeatureFlagClient _featureFlagClient;

    public FeatureFlagProvider(IFeatureFlagContext featureFlagContext, IFeatureFlagClient featureFlagClient)
    {
        //The context could be the HttpContext of the session 
        // (HttpContext.Current) or some other context object.
        // The provider will need to account for if your  
        // context object is null and return the appropriate value
        // from the IsEnabled property
        _featureFlagContext = featureFlagContext;
        _featureFlagClient = featureFlagClient;
    }

    public bool IsEnabled(FeatureFlagEnum featureFlag)
    {
        /// Use the context to determine whether the feature is turned on for the specified context       
        if (_featureFlagContext.CompanyId == null)
        {
            return false;
        }
        else
        {
            return _featureFlagClient.IsFeatureFlagEnabledForContext(_featureFlagContext.CompanyId, featureFlag);
        }
    }
}

//Once compiled both of these feature flags will be part of the FeatureFlagsEnum object

/// <summary>
/// This specific file belongs to: FeatureFlagsEnum.Dev1.cs
/// </summary>
public static partial class FeatureFlagEnums
{
    public const string InternalBugFixIssueFlag = "internal-31119-sample-feature-flag";
}

/// <summary>
/// This specific file belongs to: FeatureFlagEnums.Dev2.cs
/// </summary>
public static partial class FeatureFlagEnums
{
    public const string Company321BugFixIssue = "internal-40101-sample-feature-flag";
}

//Use of the feature flag in code would look like this
public class FooService : IFooService
{
    private readonly IFeatureFlagProvider _featureFlagProvider;
    private readonly ICompanyService _companyService;


    public FooService(IFeatureFlagProvider featureFlagProvider, ICompanyService companyService)
    {
        _featureFlagProvider = featureFlagProvider;
        _companyService = companyService;
    }


    public async Task<string> DoFoo(string inputValue)
    {
        if (_featureFlagProvider.IsEnabled(FeatureFlagEnums.InternalBugFixIssueFlag))
        {
            return await _companyService.DoSomethingCool(inputValue);
        }
        else
        {
            return await _companyService.DoSomethingCooler(inputValue);
        }
    }
}
```
Figure 1.2 Initial Introduction of the feature flag into code. 


```csharp
//Foo service once the feature flag has been removed
public class FooService : IFooService
{
    private readonly IFeatureFlagProvider _featureFlagProvider;
    private readonly ICompanyService _companyService;

    public Foo(IFeatureFlagProvider featureFlagProvider, ICompanyService companyService)
    {
        _featureFlagProvider = featureFlagProvider;
        _companyService = companyService;
    }

    public async Task<string> DoFoo(string inputValue)
    {
        return await _companyService.DoSomethingCool(inputValue);
    }
}


/// Unused code removed from the company service
public class CompanyService : ICompanyService
{
    public async Task<string> DoSomethingCooler(string inputValue1)
    {
        //Imagine some cooler code here 
    }


    public async Task<string> DoTheCoolestThing(string inputValue1)
    {
        //Imagine some of the coolest code here 
    }
}
```
Figure 1.3 Same code block from Figure 1.1 after the feature flag has been removed.
Real World Scenarios 

### The Big Refactor
If your development team is not made up of AI agents yet, then you’ve heard the phrase “I want to rewrite that whole feature from scratch”.  In one of the development teams I worked with, we wanted to remove the use of stored procedures and replace it with an object relational mapping tool (ORM).  On the surface it doesn’t sound crazy, until you factor in that the application had over 900+ stored procedures.   Where in most development organizations this would be a non-starter, we were able to start work on this immediately.  How? Look at Figure 2.1 to see where we started.  

```csharp
/// Parameter Values Class 
public class ParameterValue
{
    public string ParameterName { get; set; }
    public object ParamterValue { get; set; }

    public ParameterValue(string parameterName, object parameterValue)
    {
        ParameterName = parameterName;
        ParameterValue = parameterValue;
    }
}

/// Generic Data Service
public class DataService : IDataService
{
    public async Task GenericQuery1(string inputValue)
    {
        ExecuteStoredProcedure("GenericStoredProcedure",
            new List<ParameterValue>(){
                new ParameterValue("Value1", inputValue)
            });
    }

    public async Task GenericQuery2(string inputValue)
    {
        ExecuteStoredProcedure("AnotherStoredProcedure",
            new List<ParameterValue>(){
                new ParameterValue("Value1", inputValue)
            });
    }

    private async Task ExecuteStoredProcedure(string procedureName, List<ParameterValue> paramters)
    {
        /// Code to Execute Stored Procedure against a data store here 
    }
}
```
Figure 2.1 - Before any Changes

Nothing super interesting in that code snippet.  Your normal boiler plate stored procedure execution.  But look at how easy it was for us to start implementing changes to how we are accessing our data with a few lines of code. Look at figure 2.2 

```csharp
/// Generic Data Service
public class DataService : IDataService
{
    private readonly IFeatureFlagProvider _featureFlagProvider;

    public DataService(IFeatureFlagProvider featureFlagProvider)
    {
        _featureFlagProvider = featureFlagProvider;
    }

    public async Task GenericQuery1(string inputValue)
    {
        // Add a feature flag if statement here
        if (_featureFlagProvider.IsEnabled(FeatureFlagsEnum.UseNewQuery1))
        {
            await GetData(
                new List<ParameterValue>(){
                    new ParameterValue("Value1", inputValue)
                });
        }
        else
        {
            await ExecuteStoredProcedure("GenericStoredProcedure",
             new List<ParameterValue>(){
                new ParameterValue("Value1", inputValue)
            });
        }
    }

    public async Task GenericQuery2(string inputValue)
    {
        ExecuteStoredProcedure("AnotherStoredProcedure",
            new List<ParameterValue>(){
                new ParameterValue("Value1", inputValue)
            });
    }


    /// New method that doesn't use stored procedures 
    private async Task GetData(List<ParameterValue> parameters)
    {

    }

    private async Task ExecuteStoredProcedure(string procedureName, List<ParameterValue> paramters)
    {
        /// Code to Execute Stored Procedure against a data store here 
    }
}
```
Figure 2.2
	
Using feature flags we were able to start chipping away at a major refactor while still maintaining the legacy code.  By using a context, we could control how many users were executing our new source code.  We could deploy several changes with little to no user impact.  

