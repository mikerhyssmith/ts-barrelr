# ts-barrelr
[![VSCodeVersion](https://vsmarketplacebadge.apphb.com/version/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)
[![VSCodeInstalls](https://vsmarketplacebadge.apphb.com/installs/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)
[![TravisStatus](https://travis-ci.org/mikerhyssmith/ts-barrelr.svg?branch=master)](https://travis-ci.org/mikerhyssmith/ts-barrelr)



## Features

ts-barrelr automates the production of index.ts barrel files.

ts-barrelr will produce an index.ts containing all files and folders within the folder containing the current file open in the editor window.

Running barrelr where an index.ts exists will update it with any changes to files within the folder.

The default keybinding to barrel is "ctrl-alt-b" for windows and linux users and "cmd-alt-b" for mac users.


## Configuration

### Included files:
By default barrelr will include any files with a `.ts` or `.tsx` extension but this can be configured via the setting **barrelr.fileExtensionRegex**

### Quote Marks:
By default ts-barrelr will use single quotes as the default quotemark for imports in index.ts files. This can be changed to double quotes using the setting: **barrelr.useDoubleQuotes**

### Files to exclude:
By default ts-barrelr will exclude any files containing .spec., .e2e. or .test. This can be changed as a regular expression by changing the setting:  **barrelr.excludeFileRegex**
