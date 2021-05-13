---
title: Send Page Feedback to Teams Channel using incoming webhook from SharePoint Online [SPFx]
date: 2021-05-09 23:31:37
tags:

  - Incoming Webhooks
  - SPFX
  - Microsoft Teams  

description:
  Send Page Feedback to Teams Channel using incoming webhook from SharePoint Online [SPFx]

categories: Microsoft Teams
language: English
summary: How to post external request to Microsoft Teams with incoming webhooks from SharePoint Online.
img: /images/postcover/postcover-5.jpg
cover: true
coverImg: /images/postcover/postcover-5.jpg
---

# Send Page Feedback to Teams Channel using incoming webhook from SharePoint Online [SPFx]

Incoming webhooks are a special type of Connector in Teams that provide a simple way for an external app to share content in team channels and are often used as tracking and notification tools. Teams provide a unique URL to which you send a JSON payload with the message that you want to POST, typically in a card format.

In this article, We are going to send a SharePoint page feedback using SPFx Application Customizer to Microsoft Teams Channel using Incoming webhook.

## Final Output

![](output-1.png) ![](output-2.png)

## Setup an incoming webhook to a Teams channel

First of all, let's add an incoming webhook to a team channel 

1. Navigate to the **channel** where you want to add the webhook and click on (•••) more options.

2. Choose Connectors from the drop-down menu and search for **Incoming Webhook**.

3. Click the Add button.

4. Click the Add button again to add the webhook to the selected channel.

5. Repeat step 1 and step 2. Click on the **Configure** button in front Incoming Webhook.

6. Provide a name, and, optionally, upload an image avatar for your webhook. The dialog window will present a unique URL that will map to the channel. ***Make sure that you copy and save the URL—you will need to provide it to the outside service***.

7. Select the Done button. The webhook will be available in the team channel.

## Creating Adaptive Card

I am converting page feedback into an Adaptive Card before passing this as part of my post request to the Team incoming webhook connector

Adaptive Cards are easy to use and a powerful way of customizing UI for Teams. Microsoft Teams uses cards in Connectors, Bots and Messaging extensions.

Here are some useful links for creating Adaptive Cards. 

  + [Adaptive Cards Designer](https://adaptivecards.io/)
  + [What are cards](https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/what-are-cards)

``` Javascript
export const PageFeedbackCard = (values) => {
    const card = {
        type: "message",
        attachments: [{
            contentType: "application/vnd.microsoft.card.adaptive",
            content: {
                type: "AdaptiveCard",
                body: [{
                        type: "TextBlock",
                        size: "Large",
                        color: "Attention",
                        wrap: true,
                        spacing: "Large",
                        text: `Contoso Feedback : ${values.pageName}`
                    },
                    {
                        type: "ColumnSet",
                        columns: [{
                                type: "Column",
                                items: [{
                                    type: "Image",
                                    url: "https://cdn2.iconfinder.com/data/icons/bitsies/128/Document-512.png",
                                    isVisible: true,
                                    size: "Medium"
                                }],
                                width: "auto",
                                separator: true,
                                style: "emphasis",
                                bleed: true
                            },
                            {
                                type: "Column",
                                items: [{
                                        type: "TextBlock",
                                        weight: "Bolder",
                                        text: "What were you doing?",
                                        wrap: true
                                    },
                                    {
                                        type: "TextBlock",
                                        spacing: "None",
                                        text: `${values.Q1Answer}`,
                                        isSubtle: true,
                                        wrap: true
                                    },
                                    {
                                        type: "TextBlock",
                                        weight: "Bolder",
                                        text: "What went wrong?",
                                        wrap: true
                                    },
                                    {
                                        type: "TextBlock",
                                        spacing: "None",
                                        text: `${values.Q2Answer}`,
                                        isSubtle: true,
                                        wrap: true
                                    }
                                ],
                                width: "stretch",
                                separator: true,
                                style: "emphasis",
                                bleed: true

                            }
                        ],
                        separator: true
                    }
                ],
                actions: [{
                    type: "Action.OpenUrl",
                    title: "View",
                    url: `${values.pageUrl}`
                }],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.2"
            },
        }, ],
    };
    return card;
};
```

## Sending notifications to Teams

Sending notification to Teams is very straightforward. It's simply a post request to the Incoming Webhook connector URL. 

To send notification to the Teams channel, you need following

1. Connector URL. See above **Setup an incoming webhook to a Teams channel** How to create Connector URL. For more detail please visit [Add an incoming webhook to a Teams channel](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#add-an-incoming-webhook-to-a-teams-channel)

2. An Adaptive Card

``` Javascript
public async SendTeamsNotification(connectorUrl: string, card: any): Promise < any > {

    try {
        const requestOptions: RequestInit = {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Content-Type": "Content-Type:application/json"
            },
            body: JSON.stringify(card)
        };

        const response = await fetch(connectorUrl, requestOptions);
        return response;
    } catch (error) {
        console.error(`Error getting data from ${connectorUrl}`, error);
        throw error;
    }
}
}
```
## Reference Articles

[Use Incoming Webhooks in SPFx app to send page feedback to Microsoft Teams channel](https://rabiawilliams.com/teams/spfx-teams-incoming-webhooks/)

[Use incoming webhooks and Adaptive Cards with Microsoft Teams](https://yhabersaat.ch/2020/12/17/incoming-webhooks-microsoft-teams/)


Hopefully, this is a useful starting point on how to use incoming webhooks in Teams. I will upload the source code to Github shortly.

Happy Teams Dev