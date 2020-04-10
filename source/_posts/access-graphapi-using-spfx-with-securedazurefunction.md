---
layout: post
title: Access Microsoft Graph API using SFPX with Secured Azure Function
date: 2020-04-10 22:31:12
language: English
tags:
  - Azure Function
  - Authentication
  - SPFx    
description: This post detail about calling a secured Azure Function from SharePoint Framework (SPFx) to retrieve a list of users using Microsoft Graph API.
categories: SharePoint Framework 
summary: This post detail about calling a secured Azure Function from SharePoint Framework (SPFx) to retrieve a list of users using Microsoft Graph API.
img: /images/post/access-graph-api-using-spfx-with-azurefunction.png
cover: true
coverImg: /images/postcover/postcover-3.jpg
---


## Scenario

As we know, SPFx runs in the context of logged In user. In a scenario where your application needs to perform some tasks which require more permissions then currently logged In user, you can use this approach to handle those scenarios.
For example, You can configure Azure AD app with elevated Microsoft Graph API permissions and then call Microsoft Graph API from Azure Function.


**Here are high-level steps**

+ Create a self-signed certificate
+ Create an Azure AD app and add required Microsoft Graph API permissions
+ Create and Configure Azure Key Vault
+ Create an Azure Function
+ Calling an Azure Function from SPFx

## Create a Self-Signed Certificate

There is a PnP PowerShell command [New-PnPAzureCertificate](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/new-pnpazurecertificate?view=sharepoint-ps) which can be used to Generate a new 2048bit self-signed certificate and manifest settings for use in Azure AD App.

👉 Here is a script which can generate a self-signed certificate and manifest settings.

<script src="https://gist.github.com/ejazhussain/614649540941600fa1e8650ecb093825.js"></script>

When you run the above script, Following certificate files will be generated. 

+ GraphAPISPFx.pfx
+ GraphAPISPFx.cer

## Create and Configure Azure AD App

1.  Create an Azure AD App
2.  Under **API Permissions**, Add application permissions for Microsoft Graph API and give admin consent.

![](graph-api-permissions.png)

3.  Under **Expose an API**, Add user_impersonation scope.

![](add-api-scope.png)

4. Under **Certificates & secrets**, Upload the certificate ***AccessGraphAPISPFx.cer*** file created in previous step. 

5. Once you uploaded the above certificate and added a new user_impersonation scope, App manifest file will automatically be updated in the background. See below ***KeyCredentials*** and ***user_impersonation*** sections
![](app-manifest.png)


## Create and Configure Azure Key Vault

We are going to use Azure Key Vault to save our certificate so that we can retrieve this from Azure Function to get authentication provider for calling Microsoft Graph API.

1. Create an Azure Key Vault
2. Import your certificate in an azure key vault

![](keyvault.png)
3. The last step is to add access policy for following Azure Function and give appropriate permissions (Get and List permission should be sufficient) to retrieve secrets. This step should perform after you have created an Azure function and enable Managed Service Identity.

![](azure-function-accesspolicy.png)

## Create an Azure Function

Create an Azure Function which is going to retrieve a list of users using Microsoft Graph API. Technically at this stage, you can call any Microsoft Graph API endpoints as long as you have appropriate permissions granted in Azure Ad App. But for simplicity, I am going to just retrieve all users in my organization.

Here are list tasks we are going to perform in Azure Function

1. Create an Azure Function
2. Retrieve certificate from Azure Key Vault via [Managed Service Identity](https://docs.microsoft.com/bs-latn-ba/azure/key-vault/managed-identity)
3. We are going to use Microsoft Authentication Library (MSAL) client credential authentication provider using a certificate. There are two different ways to get an authentication provider using Microsoft Authentication Library (MSAL). 

   1. using ***Microsoft.Identity.Client***  OR
   2. using ***Microsoft.Graph.Auth***. [Microsoft Graph Auth library](https://github.com/microsoftgraph/msgraph-sdk-dotnet-auth) provides a wrapper for Microsoft Authentication Library (MSAL). We are going to use this approach here.
4. Here is code which retrieves the certificate from an Azure key vault and then gets Authentication Provider to call Microsoft Graph API

<script src="https://gist.github.com/ejazhussain/243cfbad05d9106b2275b37d98d2e184.js"></script>

5. Retrieve certificate from Azure Vault 

<script src="https://gist.github.com/ejazhussain/564efae19e226db87008da9ebbf89cfc.js"></script>

6. Get client credential authentication provider based on the certificate using ***Microsoft.Graph.Auth***

<script src="https://gist.github.com/ejazhussain/376b0e8c15730c285bff2c33e33bc671.js"></script>

7. Make sure you have to enable Managed Service Identity for your azure function and added appropriate access policy in Azure Vault as described above

## Calling an Azure Function from SPFx

At this point, your Azure Function should be secured by Azure AD and ready to be called from SPFx web part.

1. Add the following permissions requests in your package-solution.json

![](SPFx-webapi-permissions.png)

2. Approve above permission from SharePoint Admin Web Api Permission Management page

3. Here is how you can get AADHttpClient using SPFx and call Microsoft Graph Api
<script src="https://gist.github.com/ejazhussain/9dc78e14e5500334d0dcb54e77a93b04.js"></script>

  

  




