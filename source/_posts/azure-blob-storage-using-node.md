---
title: Azure blob storage operations using Node.js
date: 2018-12-23 14:50:51
description: "How to peroform different Azure blob storage operations using Node.js, Blob containers, Blob metadata, Blob properties"
tags: [Azure, Azure Blog Storage, Node JS]
category:
featured_image: post-featured.png
---
## Azure blob storage operations using Node.js

This article will provide how-to-guide to work with Azure Blog storage using Node.js

Currently Microsoft Azure Storage SDK.v2 is avaialble as stable version. SDK.v10 is still in preview and which has more features compare to SKD.v2. [Go to Storage SDK v10 for JavaScript (In preview)](https://github.com/Azure/azure-storage-js)
In SDK.v2 you can find different operations for Blob, Queue , File,Table in callback style. See below.

## Azure Storage SDK.v2 basic beatures

**Blobs**
    Create/Delete Containers
    Create/Read/Update/Delete Blobs
**Tables**
    Create/Delete Tables
    Query/Create/Read/Update/Delete Entities
**Files**
    Create/Delete Shares
    Create/Delete Directories
**Create/Read/Update/Delete Files**
    Queues
    Create/Delete Queues
**Insert/Peek Queue Messages**
    Advanced Queue Operations
    Service Properties
**Get Service Properties**
    Set Service Properties

## Comparison of Azure Storage SDK.v2 and SDKv.10 (In preview)



| SDK Name                             	| Version     	| Description                                                                   	| NPM/API Reference Links 	|
|--------------------------------------	|-------------	|-------------------------------------------------------------------------------	|-------------------------	|
| [storage SDK v10 for JavaScript](https://github.com/Azure/azure-storage-js)       	| v10-Preview 	| The next generation async Storage SDK (Blob only, async and promise support)  	| [NPM - Reference](https://www.npmjs.com/package/@azure/storage-blob)         	|
| [Storage SDK v2 for JavaScript](https://github.com/Azure/azure-storage-node)        	| v2          	| Legacy Storage SDK in this repository (Blob/Queue/File/Table, callback style) 	| [NPM - Reference](https://www.npmjs.com/package/azure-storage)         	|
| [Azure Management SDKs for JavaScript](https://github.com/Azure/azure-sdk-for-node) 	| v2          	| Management SDKs including Storage Resource Provider APIs                      	| [NPM - Reference](https://www.npmjs.com/package/azure)         	|

		

Please check details on API reference documents:

[Microsoft official API document on docs.microsoft.com](https://docs.microsoft.com/en-us/javascript/api/azure-storage/?view=azure-node-latest)
[Generated API references on GitHub pages](http://azure.github.io/azure-storage-node/)


**Prerequisites**

1. First of all, you need to install Microsoft Azure Storage SDK for Node.js and JavaScript for Browsers using following npm package.
```
👉 npm install azure-storage --save
```
2. Make sure you have Azure Storage account created in Azure and copy connection string [Here is a quick guide to create Azure Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account?tabs=azure-portal)
3. Create a blob container
4. Install dotenv package to save your Azure Storage Connection String other configurations
```
👉 npm install dotenv --save
```

## Some Code
<script src="https://gist.github.com/ejazhussain/8b7fde5bcbb498bb6b5db4b18059e88a.js"></script>
