---
title: SPFX Application Customizer with App Insight
tags:
  - Modern SharePoint
  - Azure App Insights
  - SPFX
  - Application Customizer
description: 
  Azure App Insight configuration using SPFX Application customizer in
  SharePoint Modern Pages
date: 2018-12-16 18:53:19
category:
featured_image: post-featured.png 
---


## SPFX Application Customizer with Azure App Insight and Custom Script

Previously i have explained how you can configure Azure App Insight in SharePoint Online classic mode. 

As Microsoft driving towards SharePoint modern sites where it is not possible to edit Master Page to add your custom artefacts. However, you can still run custom scripts using different pnp provisoning engine templates etc.

In this post, I would like to show you following two scenarios

1. How you can configure Azure Application Insight within SharePoint modern site using SPFX Application Customizer.
2. How to add custom javascript snippet

Before i jump into more detail i would like to give credit to **Chris O Brien**. He has written wonderful article on. [Use an SPFx Application Customizer to add JavaScript (e.g. header) to every page in a site](https://www.sharepointnutsandbolts.com/2017/06/SPFx-Application-Customizer-Global-JS-Page-Header.html)

### Step 1 : Create Application Customizer empty project 

Here are wonderful tutorials available by microsoft [Getting Started with SPFX Application Customizer](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/build-a-hello-world-extension)

### Step2 : Install below npm package and import into your solution

``` 
👉 npm install applicationinsights-js
```

#### Prerequisite

1. Make sure you have valid Azure App Insight key
2. Create a custom property called 'instrumentationKey' and add valid Azure App Insight Key under **serve.json** file under config folder

{% asset_img custom-properties.png %}


👉 Here is code snippet

 <script src="https://gist.github.com/ejazhussain/a1857b35fb28beb334e93280b66628b1.js"></script>

Happy SharePoint modernization!
