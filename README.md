# ts-barrelr README
[![VSCodeVersion](http://vsmarketplacebadge.apphb.com/version/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)
[![VSCodeInstalls](http://vsmarketplacebadge.apphb.com/installs/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)



## Features

ts-barrelr automates the production of index.ts barrel files.

ts-barrelr will produce an index.ts containing all files and folders within the folder containing the current file open in the editor window.

Running barrelr where an index.ts exists will update it with any changes to files within the folder.

The default keybinding to barrel is "ctrl-alt-b" for windows and linux users and "cmd-alt-b" for mac users.

By default ts-barrelr will use single quotes as the default quotemark for imports in index.ts files. This can be changed to double quotes using the setting: **barrelr.useDoubleQuotes**


## Upcoming Features
Recursive barreling - from a directory barrelr will produce index.ts files for the current directory and all sub directories.

Excluding files - barrelr will allow you to specify file types to exclude from the barrel for example test files (.spec.ts, .test.ts).
