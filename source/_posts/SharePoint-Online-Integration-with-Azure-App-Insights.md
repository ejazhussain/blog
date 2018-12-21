---
title: SharePoint Online Integration with Azure App Insights
date: 2018-09-09 16:12:00
tags: [Azure Application Insight, Azure, Analytics, SharePoint Online]
description: SharePoint Online Integration with Azure App Insights
category:
featured_image: post-featured.png  
---

## SharePoint Online Integration with Azure App Insights

Recently I had a chance to work on one of the project to monitor custom events from SharePoint Online pages.

Keeping in mind above scenario, there are two platform comes in my mind

* Azure App Insights
* Google Analytics

I really liked Azure App Insights. Azure Application Insight is more than just custom dimensions, metrics and page views. It is an extensible Application Performance Management (APM) service.

### Application Insights monitors

here are few of the examples of different type of data being analyzed by Azure App Insight

1. Request rates, response times, and failure rates
2. Dependency rates, response times, and failure rates
3. Exceptions
4. Load Performance 

for complete list, visit [What is Application Insights?](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-overview)

### Solution

Here are the steps to track custom events in the page. One of the scenario for custom events could be to track event every time user click on the external link. 

1. Create Azure Application Insight
{% asset_img create-new-azure-app-insight.png %}
2. Once the azure app insight is created. keep note of your Instrumentation Key.
3. JavaScript code snippet to track custom event from SharePoint Page

``` JavaScript

$(function () {
    RemoteInject();
});
function RemoteInject() {

    var appInsights = window.appInsights || function (a) {
        function b(a) { c[a] = function () { var b = arguments; c.queue.push(function () { c[a].apply(c, b) }) } } var c = { config: a }, d = document, e = window; setTimeout(function () { var b = d.createElement("script"); b.src = a.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js", d.getElementsByTagName("script")[0].parentNode.appendChild(b) }); try { c.cookie = d.cookie } catch (a) { } c.queue = []; for (var f = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; f.length;)b("track" + f.pop()); if (b("setAuthenticatedUserContext"), b("clearAuthenticatedUserContext"), b("startTrackEvent"), b("stopTrackEvent"), b("startTrackPage"), b("stopTrackPage"), b("flush"), !a.disableExceptionTracking) { f = "onerror", b("_" + f); var g = e[f]; e[f] = function (a, b, d, e, h) { var i = g && g(a, b, d, e, h); return !0 !== i && c["_" + f](a, b, d, e, h), i } } return c
    }({
        instrumentationKey: ""
    });
    window.appInsights = appInsights;
    appInsights.trackPageView("CodeHub Monitoring");

    $('a').click(function () {

        var link = this.hostname;
        if ($('a').isExternal(link)) {           
            window.appInsights.trackEvent('External link clicked with URL',
                {
                    Url: $(this).attr('href')
                },
                {});
        }
        else { 
        }

    });

};

$.fn.isExternal = function (link) {
    var host = window.location.host;
    return (link !== host);
};

```

4. The next step is to inject this piece of JavaScript in every page in your Office 365 portal. There are plenty of ways to do this. I am going to create a custom action.

5. Create few external and internal links on SharePoint Page. As soon you will click on external link, External link information will be tracked. Sometimes you have to wait for couple of minutes before your event data start appearing in the Azure App Insight.

6. Here is screenshot where external link event information appears
{% asset_img customevents.png %}

Here are some of Azure Application Insights API Methods. For more information visit [Application Insights API Methods](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-api-custom-events-metrics)

1. TrackPageView    
2. TrackEvent   
3. TrackMetric  
4. TrackException   
5. TrackRequest 
6. TrackTrace   
7. TrackDependency

I hope this helps and gives a starting point to implement complex scenarios.






