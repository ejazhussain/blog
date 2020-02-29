---
title: SharePoint Online:Import Terms From CSV
date: 2018-08-27 18:21:56
tags: [Sharepoint TermStore, PnP PowerShell]
description: SharePoint Online:Import Terms From CSV file
category: [PowerShell]
featured_image: post-featured.png
---

<strong>Requirement:</strong> Import terms to term set in SharePoint Online from a CSV file using PowerShell.

Here is my sample csv file. [Click here](groups.csv) to download.

{% asset_img samplecsv.png %}




<strong>Assumptions:</strong> Make sure TermSets are present in the term store. Probably i could also add code to check if term already exist etc. But for now i am keeping it simple.



``` PowerShell


# +---------------------------------------------------------------------------+
# | User defined variables                                                    |
# +---------------------------------------------------------------------------+

$tenant = "SPCode"
$siteUrl = "https://spcode.sharepoint.com/"
$path = "C:\temp\groups.csv"

# +---------------------------------------------------------------------------+
# | Connect to SharePoint                                                  |
# +---------------------------------------------------------------------------+

#$creds = Get-Credential


Write-Output $("Connecting to {0}" -f $tenant);
Connect-PnPOnline -Url $siteUrl

write-host "connected with $($siteUrl)"


function CreateTermSet {
    param (
        [string]$name
    )
    try {       
        New-PnPTermSet -Name $name -TermGroup "TAA"        
        Write-Host "$($name) TermSet created. " -ForegroundColor Magenta
    }
    catch [Exception] {
        Write-Host "$($name) TermSet creation failed with Exception $($_.Exception.Message)." -ForegroundColor Red
    }
}


# +---------------------------------------------------------------------------+
# | Getting csv data                                                  |
# +---------------------------------------------------------------------------+

$csvData = Import-Csv -Path $path

$groupName = $csvData | Select-Object -ExpandProperty "GroupName" | Where-Object {($_ -ne "")} 
$groupCode = $csvData  | Select-Object -ExpandProperty "Groupcode" | Where-Object {($_ -ne "")} 
$groupCategoryID = $csvData | Select-Object -ExpandProperty "GroupCategoryID" | Where-Object {($_ -ne "")}

$termsHashTable = @{}
$termsHashTable."GroupName" = @($groupName) #adds an array
$termsHashTable."Groupcode" = @($groupCode) #adds an array
$termsHashTable."GroupCategoryID" = @($groupCategoryID) #adds an array

foreach ($key in $termsHashTable.Keys) {

    
    Write-host "Creating $($key) terms......" -ForegroundColor Cyan

    $values = $termsHashTable[$key]   

    foreach ($item in $values) {

        try {       
            New-PnPTerm -TermSet $key -TermGroup "TAA" -Name $item -LCID "1033"
            Write-host $item " term created"  -ForegroundColor Green
        }       
        catch [Exception] {
            Write-host $item " failed with exception message " $_.Exception.Message    -ForegroundColor Red       
        }
    }
}


```

## Import Terms to Term Set from CSV using CSOM PowerShell

``` PowerShell
#Load SharePoint CSOM Assemblies
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Taxonomy.dll"
   
#Variables for Processing
$AdminURL = "https://spcode-admin.sharepoint.com/"
$TermGroupName= "TAA"
$TermSetName="GroupName"
$CSVFile ="C:\Temp\ImportTerms.csv"
$TermHeaderInCSV ="GroupName"
 
Try {
    #Get Credentials to connect
    $Cred = Get-Credential
    $Credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($Cred.Username, $Cred.Password)
 
    #Setup the context
    $Ctx = New-Object Microsoft.SharePoint.Client.ClientContext($AdminURL)
    $Ctx.Credentials = $Credentials
 
    #Get the term store
    $TaxonomySession=[Microsoft.SharePoint.Client.Taxonomy.TaxonomySession]::GetTaxonomySession($Ctx)
    $TaxonomySession.UpdateCache()
    $TermStore =$TaxonomySession.GetDefaultSiteCollectionTermStore()
    $Ctx.Load($TaxonomySession)
    $Ctx.Load($TermStore)
    $Ctx.ExecuteQuery()
 
    #Get Termstore data from CSV and iterate through each row
    Import-Csv $CSVFile | ForEach-Object {
       
        #Get the Term Group
        $TermGroup=$TermStore.Groups.GetByName($TermGroupName)
 
        #Get the term set
        $TermSet = $TermGroup.TermSets.GetByName($TermSetName)
 
        #CSV File Header Row in Term to Add
        $TermName = $_.$($TermHeaderInCSV)
  
        #Check if the given term exists already
        $Terms = $TermSet.Terms
        $Ctx.Load($Terms)
        $Ctx.ExecuteQuery()
        $Term = $Terms | Where-Object {$_.Name -eq $TermName}
     
        If(-not $Term)
        {
            #Create Term Set
            Write-host "Creating Term '$TermName'" -ForegroundColor Cyan
            $Term = $TermSet.CreateTerm($TermName,1033,[System.Guid]::NewGuid().toString())
            $Ctx.Load($Term)
            $Ctx.ExecuteQuery()
            $Term.TermStore.CommitAll()
            $TaxonomySession.UpdateCache()
            Write-host "New Term '$TermName' Added Successfully!" -ForegroundColor Green
        }
        else
        {
            Write-host "Term '$TermName' Exists Already!" -ForegroundColor Yellow
        }
    }
 }
Catch {
    write-host -f Red "Error Importing Term store Data!" $_.Exception.Message
}


```


