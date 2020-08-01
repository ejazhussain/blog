---
layout: post
title: Microsoft Teams Personal Tab Integration with Graph API using Single Sign-On
date: 2020-07-27 18:51:21
description: Calling Microsoft Graph API from Teams Personal Tab using Single Sign-On (SSO) approach.
language: English
tags:
  - Teams Personal Tab
  - Microsoft Graph API
category: Microsoft Teams
summary: Calling Microsoft Graph API from Microsoft Teams Personal Tab using Single Sign-On (SSO) approach.
img: /images/post/access-graph-api-using-spfx-with-azurefunction.png
cover: true
coverImg: /images/postcover/postcover-3.jpg
---

# Develop Microsoft Teams Personal Tab using SSO

There are multiple options available to build Microsoft Teams app and access Microsoft Graph API.

Here in this post, we are going to look into how to access Microsoft Graph API from Microsoft Teams Personal tab using Single Sign-On (SSO) approach instead of asking the user to authenticate interactively.

Here are useful links which helped me to understand and implement this scenario. 

[Contact Group Lookup App](https://docs.microsoft.com/en-us/microsoftteams/platform/samples/app-templates#contact-group-lookup-)

[How Single Sign-On (SSO) works in Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso) 

I am using the following set of tools to build this example.

> 1.  ASP.Net Core 3.1
> 2.  Web Application with React App Template.
> 3.  Ngrok for testing an app in Microsoft Teams


## Final Output

![Final output](final-output.png)



<br>

Let's get started

## 1. Register an Azure AD Application

Here are high-level steps what we need to do as part Azure AD Application registration

1. Register an Azure AD APP
2. Get your Azure AD Application ID.
3. Specify the permissions that your application needs for the Azure AD endpoint. In the context of this post, we require Microsoft Graph API **User.Read** delegated permissions
4. Grant permissions for Teams desktop, web, and mobile applications.
5. Pre-authorize Teams by selecting the Add a scope button and in the panel that opens, enter access_as_user as the Scope name
6. Generate a Client Secret

> For detail steps please follow this link, [Detail steps for Azure AD App Registration for SSO](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso#steps)

After Azure AD App registration, add the following information within your ASP.net Core **appsettings.json** file

![appsettings.json - Azure AD Auth Settings](azure-ad-auth.jpg)

## 2. Creating a Manifest File

I am not going into detail about how to create a manifest file. Here is a link which describes Manifest schema for Microsoft Teams App.

[Microsoft Teams App Manifest Schema](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema)

In the context of this post. we only need to add **Static Tab configurations**

> Here is link of [Manifest](https://github.com/ejazhussain/Teams-PersonalApp-SSO/blob/master/Teams.PA.Graph.UserProfile/Teams.PA.Graph.UserProfile/Manifest/manifest.json) file part of this project. Update manifest file as per your envrionment.

#### Creating Teams app package

Edit your project file. For example, in this project, it will be ***Teams.PA.Graph.UserProfile.csproj***. Add the following code just before closing project ```</Project>``` tag.

On successful build of your project, following code snippet will automatically create teams app package in zip format. You can upload this package directly to Microsoft Teams.

<script src="https://gist.github.com/ejazhussain/178e7cd3544986ff121d4db34d441b20.js"></script>


## 3. Setup Ngrok

In my case, I am using a reserved domain for ngrok. But If you are using a free plan then you will get a randomly generated domain.

Run following commands according to ngrok plan. [More information about ngrok](https://ngrok.com/)

**Free Plan**

```
ngrok http https://localhost:44399 -host-header="localhost:44399"
```

**Pro Plan**

```
ngrok http https://localhost:44376 -host-header="localhost:44399" -subdomain=helloteamsapp.com
```

![ngrok](ngrok.png)

Once you have ngrok up and running, Make sure to update **[Application ID URI]** with correct ngrok domain in Azure AD App. See below screenshot

![Application ID URI in Azure AD App](ApplicationIDURI.png)

> At this stage, we have done all configurations related steps. Now let's do some coding

## 4. React SPA (Single Page Application) Implementation

Let's look at SPA (Single Page App) first.

Install following two npm packages

```
npm i @microsoft/teams-js
npm i axios
```

First of all, We are going to get Microsoft Team context and then get an ID token using **[GetAuthToken]** method. see below implementation.

> <i class="fa fa-info-circle page-section-info-icon-info"></i><br/>You cannot use ID token to call direclty microsoft graph api. You have to call **[On Behalf Of Flow]** to get access token using ID token. To see what's in your ID token. Go to [jwt.ms](https://jwt.ms/).

Once we got an ID token, we need to call a method called GetUserProfile in User controller **/api/user/GetUserProfile** and pass ID token as a parameter.

```Javascript

import React, { Component } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import Axios from "axios";

export class UserProfile extends Component {
  static displayName = UserProfile.name;

  constructor(props) {
    super(props);
    this.state = { userInfo: [], loading: true };
  }

componentDidMount() {
    microsoftTeams.initialize();
    microsoftTeams.getContext((context) => {
      microsoftTeams.authentication.getAuthToken({
        successCallback: (token) => {
          this.populateUserProfileInfo(token);
          microsoftTeams.appInitialization.notifySuccess();
        },
        failureCallback: (error) => {
          microsoftTeams.appInitialization.notifyFailure({
            reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
            error,
          });
        },
        resources: [
          "api://helloteamsapp.com.ngrok.io/454c9845-4c41-4300-9846-ea009785ab8e",
        ],
      });
    });
  }

  static renderUserInfo(user) {
    debugger;
    return (
      <>
        <ul className="list-group">
          <li className="list-group-item active">{user.displayName}</li>
          <li className="list-group-item">{user.jobTitle}</li>
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">{user.officeLocation}</li>
          <li className="list-group-item">{user.mobilePhone}</li>
        </ul>
      </>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      UserProfile.renderUserInfo(this.state.userInfo)
    );

    return (
      <div>
        <h1 id="tabelLabel">User Profile Info</h1>
        <p>
          This component demonstrates fetching data from the Microsoft Graph
          using Single Sign-On approach.
        </p>
        {contents}
      </div>
    );
  }

  async populateUserProfileInfo(token) {
    const response = await Axios.get("/api/user/GetUserProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    debugger;
    this.setState({ userInfo: data, loading: false });
  }
}
```

## 5. On Behalf Of Flow Implementation

First of all, Install the following two packages.

```
Microsoft.Identity.Client
Microsoft.AspNetCore.Authentication.JwtBearer
```

### Secure API Calls

We need to make sure that only authorized call can be made to our API. To achieve this, We need to add JWT bearer authentication Scheme to startup class under **[ConfigureServices]** method. See below code snippet.

In JWT bearer authentication Scheme, we are checking if ID token contains correct Client ID and Application ID URI which we have configured in our Azure AD Application.

<script src="https://gist.github.com/ejazhussain/0b4f729d5e85300f009535c8f0ad71e0.js"></script>

### Token Acquisition Service

In **Token Acquisition Service**, we are going to perform the following tasks

1. Retrieve ID Token from the request
2. Retrieve Graph Scopes from **[appsettings.json]** file
3. We declare the type of the assertion we use for asserting the current user, in this case, a JSON Web Token (JWT).
4. Create a Confidential Client Application instance. [Click here for more info](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/Client-Applications#public-client-and-confidential-client-applications)
5. Get access token using **[AcquireTokenOnBehalfOf]** method.

See below *GetOnBehalfAccessTokenAsync* method in **Token Acquisition Service** 

<script src="https://gist.github.com/ejazhussain/a89166fb51971fd505d5f290488bc076.js"></script>

### Graph Service

At this stage, we have got access token which we can use to call Microsoft Graph API to get information about the current user.

see below code snippet for Graph Service which implements one method called *GetUserProfileAsync*
<script src="https://gist.github.com/ejazhussain/d84ce456f313e7dfa021c3a63c64201d.js"></script>


## 6. Source Code

<a href="https://github.com/ejazhussain/Teams-PersonalApp-SSO" class="is-primary button is-medium github">
    <span class="icon is-medium">
      <i class="fab fa-github"></i>
    </span>
    <span>Explore solution on GitHub</span>
</a>