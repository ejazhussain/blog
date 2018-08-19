---
title: Sign In As Different User In SharePoint 2013/2016
date: 2018-08-16 15:04:16
tags: [SharePoint administration, SharePoint 2013, SharePoint 2016]
categories: 
featured_image: post-featured.png  
---

## Sign In As Different User Option

I recently had to sign in as a test user on a SharePoint 2013 development environment, but I wasn’t able to locate the Sign In As Different User link that had been present in SharePoint 2010.

It’s no longer available in **SharePoint 2013/2016**.

This is a great option to have, especially for developers who need to test apps under different privileges.

But there’s still a way to sign in as a different user in SharePoint 2013/2016. Just go to the following URL:

``` 
👉 http://yourservername/_layouts/closeConnection.aspx?loginasanotheruser=true
```

(It may not work with IE 10 & Safari browsers.)

Another way of signing in as a different user is to run the browser under a different user account, but using the link above simple for quick access.

And there you go.

