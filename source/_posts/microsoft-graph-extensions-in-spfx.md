---
title: Using Microsoft Graph Extension with SPFX
date: 2019-10-14 21:30:43
description: Using Microsoft Graph Extension with SPFX
tags:
     - Microsoft Graph
     - SPFX
categories: Microsoft Graph
summary: How to use Microsoft Graph Extensions with SPFX to provide ability for user to configure consistent UI experience across different devices.
img: /images/post/microsoft-graph-extensions-in-spfx.jpg
cover: true
coverImg: /images/postcover/postcover-3.jpg
---


Main aim of this post is to show how we can use Microsoft Graph Extensions with SPFX to provide ability for user to configure consistent UI experience across different devices and apps.

As Microsoft Graph provide a single API endpoint that give you access to data and insights from office 365, azure and other platforms. 
You can also extend Microsoft Graph using your own application data.

You can directly add custom properties to Graph Resources for example, <strong>User</strong>, <strong>Group</strong>, <strong>Message</strong> etc. See following table for supported resources. 


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

There are two types of Microsoft Graph Extensions available 

### Open Extensions
- Its provide a way to add custom untyped data directly to specific resource

### Schema Extensions
- In Schema Extensions, you need to create / define your schema first and then use that schema for strongly typed custom data.

> In this demo, I will be using Graph Open Extension

### Implementation Detail

Application contain 4 tabs as below

**1. POST**

We can create a new Microsoft Graph Open Extension under this tab.

![Create Graph Extension](create-graph-extension.png)

You need to provide a JSON body of an openTypeExtension, with the following required name-value pairs, and any additional custom data. The data in the JSON payload can be primitive types, or arrays of primitive types. See below an example.

![Create Graph Extension Schema](create-graph-extension-schema.png)

One thing to make sure is that your extension name should be unique. Recommendation is to use a reverse domain name system (DNS) format that is dependent on your own domain, for example, in my case, **com.ejazhussain.settings**. 

> Do not use the Microsoft domain (Com.Microsoft or Com.OnMicrosoft) in an extension name.


**2. GET**
Here we can retrieve existing Open Graph Extension by its unique extension ID. In my case it will be **"com.ejazhussain.settings"**.
In term of choosing unique name for your 

![Get Graph Extension](get-graph-extension.png)

**3. PATCH**
Here we will update existing Open Graph Extension. There is a possibility that you might want to update only a single property. So, the trick here is that you need to get existing Graph Extension values first and then update the required property using PATCH call.
![Patch Graph Extension](patch-graph-extension.png)

**4. DELETE**
Delete Open Graph Extension
![Delete Graph Extension](delete-graph-extension.png)

Following permissions needed to create Graph Extension under **USER resource**

![USER Resource - Graph Extension Permission](graph-extension-user-permissions.png)


### Code Snippets

Here are the content of custom Graph service  
<script src="https://gist.github.com/ejazhussain/df5d08ead2250ec12fd230bda46f25d2.js"></script>


This is how you can call above Graph service from your component to Create Graph Extension. Similar way you can call GET,POST,DELETE methods.
<script src="https://gist.github.com/ejazhussain/0467bd80e158f5c4b224c1b9a5815d5a.js"></script>

You can find complete source code at the following GitHub Repo

<a href="https://github.com/ejazhussain/react-msgraph-extension" class="is-primary button is-medium github">
    <span class="icon is-medium">
      <i class="fab fa-github"></i>
    </span>
    <span>Explore solution on GitHub</span>
  </a>



  Hope you found this post useful.