---
layout: post
title: How to useContext and useReducer in SharePoint Framework (SPFx)
date: 2020-06-17 17:55:54
language: English
tags:
  - React Hooks
  - SPFx    
description: This post describes how to make use of React hooks useContext and useReducer in SharePoint Framework.
categories: SharePoint Framework 
summary: This post describes how to make use of React hooks useContext and useReducer in SharePoint Framework..
img: /images/post/react-hooks.jpg
cover: true
coverImg: /images/post/react-hooks.jpg
---

React hooks are here for a while now, I was not getting a chance to explore React hooks in more detail especially in the context of SPFx.

Here are some very useful articles to read about the usage of React hooks in SPFx. 

1. [Using React hooks to globally share service scope between components](https://www.vrdmn.com/2020/02/spfx-using-react-hooks-to-globally.html) (by Vardhaman Deshpande)
2. [Using React hooks with service scope](https://github.com/garrytrinder/spfx-servicescopes-hooks) (by Garry Trinder)
3. [React Reusable Custom Hooks in SPFx](https://rabiawilliams.com/spfx/reusable-custom-hooks/) (by Rabia William)

## Summary
This is a simple web part which shows how to make use of **useContext** and **useReducer** hooks to retrieves contacts from the contact list and also updates a contact in the list using Fluent 
UI panel control. 

The main idea is to manage your app state globally using useReducer  and access through useContext in your child components without passing through as component props

![React hooks useReducer and useContext in SPFx](react-hooks-listitems-output.png)


## Implementation

### Create an app context

First of all we need to create a global App context. 

<script src="https://gist.github.com/ejazhussain/ac5849f4311b0ce833ad52f5f435fb15.js"></script>


### Create reducer

For simplicity, we are going to create a simple reducer with two actions

1. GET_ALLITEMS
2. SET_SELECTEDITEM

<script src="https://gist.github.com/ejazhussain/8d792e65ba01aff5b56daf1e2b0482e7.js"></script>


### Root component

In our root component, first of all, we need to initialize our initial state and then pass this initial state to useReducer hook. The reducer will return an object containing state and dispatch.

The state will be our app state and dispatch method will be used to perform any action within our reducer.

Here we will also create our provider using our App Context created earlier (**ListItemsContext**). so that we can access our state and another service context globally.

<script src="https://gist.github.com/ejazhussain/22418519cc4831d89bf3bd94df83fc74.js"></script>

### ListItems component

This is how we are going to reterive latest state from reducer using **useContext** hook
>👉 const { state, dispatch } = useContext(ListItemsContext);

<script src="https://gist.github.com/ejazhussain/3b415847ef0bcf534426b96aae91486b.js"></script>


This way, we can use the React useContext and useReducer hooks to globally share app state and other services context.

Hopefully, you have found this post helpful! All code is added in the GitHub repo here: https://github.com/ejazhussain/react-hooks-listitems