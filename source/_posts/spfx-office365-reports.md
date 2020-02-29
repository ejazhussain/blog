---
title: Office 365 Usage Reports using Microsoft Graph API
date: 2019-04-07 17:44:19
description: This web part shows SharePoint Online, OnDrive and Outlook usage reports using SPFX and Microsoft Graph API
tags: [SPFX, Microsoft Graph, Charts]
category:
---
Here is another SPFX web part which produces Office 365 usages reports (SharePoint Online, OneDrive and Outlook) using Microsoft Graph API.

## How it looks like

Before i go into implementation detail, Here are few screenshots of the web part.

<strong>OneDrive - Number of total and active files</strong>
![OneDrive - Number of total and active files](final-output-onedrive.png)


<strong>Outlook - Email activity user detail</strong>
![Outlook - Email activity user detail](final-output-outlook.png)


<strong>SharePoint - Number of pages viewed across all sites</strong>
![SharePoint - Number of pages viewed across all sites](final-output-sharepoint.png)

## Implemenation Detail

Here are few components which have been used.

**1. Tabs UI**
I am using material UI react components to build tabs. There are lot's useful UI elements which you can use in your application. Find out more about [react material UI](https://material-ui.com/getting-started/installation/) 

**2. Microsoft Graph API Integration**
This is a simple SPFX web part which make use of Microsoft Graph API to access office 365 usages reports. To use Graph API, I am using Dependency Injection pattern through service scopes as written by [Vardhaman Deshpand](https://www.vrdmn.com/2019/03/using-service-scopes-to-decouple.html).

If you have multiple web parts in your solutions which are consuming Microsoft Graph API then this approach would be useful to access graph service centrally.

Here is code which implements calling MSGraphClient from a custom service.

<script src="https://gist.github.com/ejazhussain/877750b86eac6310e183c4a761877852.js"></script>

**3.Graph API Permissions**
You need following set of permissions in order to retrieve office 365 usage reports. Find out more about [consuming the Microsoft Graph API in the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial)

![Graph API Permissions to reterive office 365 usage reports](graph-api-permissions-usage-reports.png)

><i class="fa fa-info-circle"></i> **Note:**<br/>I am using BETA Graph API endpoints. Because in BETA endpoints, you can specify the format of the response. I am retrieving response in JSON format. 

**4. Charts Integration**
I am using [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) npm package for charts.  This is a React wrapper for Chart.js.
> <i class="fa fa-info-circle"></i> **Trick** <br/>If you are passing dynamic data to chart component then make sure to use redraw method to force update charts with updated dataset. see below example.

![ChartJS redraw method](chartjs-redraw-method.png)

## Source Code

<a href="https://github.com/ejazhussain/react-graph-reports" class="is-primary button is-medium github">
    <span class="icon is-medium">
      <i class="fab fa-github"></i>
    </span>
    <span>Explore solution on GitHub</span>
</a>




