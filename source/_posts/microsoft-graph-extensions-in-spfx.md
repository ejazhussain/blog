---
title: Using Microsoft Graph Extension with SPFX
date: 2019-10-14 21:30:43
description: Using Microsoft Graph Extension with SPFX
tags:
     - Micrsoft Graph
     - SPFX
category:
featured_image: post-featured.png
---

Main aim of this post is to show how can we use Micrsoft Graph Extensions with SPFX to provide ability for user to configure consistent UI experience across different devices and apps.

As Microsoft Graph provide a single API endpoint that give you access to data and insights from office 365, azure and other platforms. 
You can also extend Microsoft Graph using your own application data.

You can directly add custom properties to Graph Resources for example, <strong>User</strong>, <strong>Group</strong>, <strong>Message</strong> etc. See following table for supported resources 

| Resource                | Open extensions | Schema extensions |
|-------------------------|-----------------|-------------------|
| Administrative unit     | Preview only    | Preview only      |
| Calendar event          | GA              | GA                |
| Device                  | GA              | GA                |
| Group                   | GA              | GA                |
| Group calendar event    | GA              | GA                |
| Group conversation post | GA              | GA                |
| Message                 | GA              | GA                |
| Organization            | GA              | GA                |
| Personal contact        | GA              | GA                |
| User                    | GA              | GA                |

There are two types of Microsoft Graph Extension available 

### Open Extensions
- Its provide a way to add custom untyped data directly to specific resource

### Schema Extensions
- In Schema Extensions, you need to create / define your schema first and then use that schema for strongly typed custom data.

> In this demo, I will be using Graph Open Extension with SPFX

### Here is a screenshot of SPFX application

Application contain 4 tabs as below

**1. POST**
As name suggests, we create new Microsoft Graph Open Extension under this tab.
![Create Graph Extension](create-graph-extension.png)

**2. GET**
Here we retreive existing Open Graph Extension 
![Get Graph Extension](get-graph-extension.png)

**3. PATCH**
Here we update existing Open Graph Extension

**4. DELETE**
Delete Open Graph Extension
