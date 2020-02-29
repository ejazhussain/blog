---
title: SharePoint Framework -  Image Gallery
date: 2019-02-08 16:56:23
tags: [SPFX, Office UI Fabric]
description: Image Gallery with Taxonomy filter, Typed Search and Pagination
categories: 
---

This post describe a SPFX application which implement an image gallery with taxonomy base filtering and typed search. This application also implement pagination.

My main aim is to build this application to get my hand dirty on SPFX, PnPJS, Office UI Fabric and related technologies.

<strong>Here is screenshot of the final output</strong>

![Image gallery](spfx-image-gallery.png)
![Image with right side panel](spfx-image-gallery-with-panel.png)


## Application Component's

1. <strong>Taxonomy based filtering</strong>
This was not too complicated to build dynamic rest query based on selected metadata tag.
Trick involves using the hidden list field TaxCatchAll. This field exists for all rows having taxonomy data, and includes all the terms used.TaxCatchAll field.
![Metadata column filtering](taxonomy-query.png)
2. <strong>Typed Search</strong>
For this demo, I am using oData string query operation "startsWith". You can build more complex query using other available oData query operations.  [Here is a nice article about oData Operations](https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx)
3. <strong>Right side popup panel</strong>
This is simply build using Office UI Fabric React Component ([Panel](https://developer.microsoft.com/en-us/fabric#/components/panel)) 
4. <strong>Pagination</strong>
I must admit, I have spent more time on Pagination component compare to others, I just wanted to get this into a shape where we can start using this in real world scenarios.I have built pagination quite number of times before using JSOM using ListItemCollectionPosition object. 
First of all i would like say massive thank you to my colleague [Vardhaman Deshpande](https://www.vrdmn.com/) to resolve an issue regarding pagination.
To Build pagination i have tried below 3 options:
<strong>Option1:</strong> I have tried using custom npm package for pagination [react-js-pagination](https://www.npmjs.com/package/react-js-pagination). Package works fine if you want to just build pagination without using any sort of filtering.
<strong>Option2:</strong> PnPJS using hasNext attribute. In this approach, You have to save whole return items object with hasNext attribute for both Next and Previous state. You can be achieved pagination but somehow I have preferred option3.
<strong>Option3:</strong> Similar to Option2 but you only need to save nextLink url into array for both Next and Previous state. This option also works fine with filtering.

## Setting up the application
	
1. Create a Department Term set with associated child terms, for example,  HR, Information Services, Sales, Marketing
2. Create an Image Library and add some sample images
3. Tag each image with Department Metadata Column
4. Also fill in Title field for each image, this is require for typed search functionality


## Source Code

<a href="https://github.com/ejazhussain/SPFX-ImageGallery" class="is-primary button is-medium github">
    <span class="icon is-medium">
      <i class="fab fa-github"></i>
    </span>
    <span>Explore solution on GitHub</span>
</a>

