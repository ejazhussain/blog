---
title: Approval process using Microsoft Flow and SharePoint Online
date: 2019-03-10 13:47:32
description: Implementation of approval process using SharePoint and Microsoft Flow
tags: 
    - Microsoft Flow
    - Workflow
    - SharePoint Online
category:
featured_image: post-featured.png
---
## Approval process using Microsoft Flow and SharePoint Online

If you are looking to build an approval workflow using Microsoft Flow, then here are simple steps which will help you to create one.

### Scenario 

For example, I have a SharePoint list called Projects and on creation of a new project i would like to run an approval workflow.

![Project List](project-list.png)

Here are over all 5 steps which we are going to implement one by one for our approval workflow.

![Complete Flow Steps](complete-flow-steps.png)

First of all, Create your workflow from blank template

![Create Flow from Blank Template](flow-blank-template.png)

### Step 1 - When Item Is Created or Modified

Under SharePoint action, select SharePoint Trigger called **When Item Is Created Or Modified**. Add your site collection URL and select associated  list or library. In my case this will be a project list.

*If you cannot select your site collection URL from Site Address dropdown field, then you can click on **Enter Custom Value** option to add your site collection URL*

![When Item Is Created Or Modified SharePoint Trigger](item-created-modified.png)

### Step 2 - Get File Metadata

In this step, we need to grab the metadata of newly created SharePoint List Item. The reason we need this, we need to get ETAG, which we need in later steps.

![SharePoint Action - Get File Metadata](get-file-metadata.png)

### Step 3 - Start and wait for an approval 

In this step, add and configure, **Start and wait for an approval** action. It’s worth mentioning here that you can direclty add Markdown styles in Detail field. see below screenshot

**Approval Type Field**: You can select two options, 1- Everyone must approve 2- First to response. In this case, I will be selecting *Everyone must approve*. In rest of the fields, You can add dynamic data from associated list (In our case, It’s **Projects** list)

![Approvals Action - Start and wait for an approval](start-approval-action.png)

### Step 4 - Condition

Here we need to add **Condition** action to check if outcome of the response is approve or reject. And base on the outcome, we need to set the content approval status of the SharePoint list item.

![Condition Action](conditon.png)

![Set Content Approval Status](content-approval-status.png)

### Step 5 - Send Outcome as an email

In this task, we need to send an outcome of the approval by email to submitter or prepare of the project. For this, we need to use **Office 365 Outlook Action - Send an email**

![Send an email action](send-email-action.png)

*Make sure to run Flow Checker to check for any errors or warnings*

![Flow checker](flow-checker.png)


## Notification Email and Approve or Reject Actions

This is how notification email looks like. As mentioned above, you can style body of the task using Markdown. 

![Task notification email](task-notification-email.png)

one of the game changers for Flow is, you can simply approve or reject tasks directly from your email. You can also add additional comments. see below.

![Approve or reject outcome action](approve-reject-comments.png)

Once task approved, here is a final email notification to submitter looks like.

![Task outcome email](confirmation-email.png)

And associated  Project list is updated with the outcome 

![Task outcome](list-approver-response.png)

This is very simple scenario of Approval process using Flow. You can build more complex scenario for example, adding multiple conditionally approvers based on outcome from the first approver etc. 

Hope you found this post useful!







