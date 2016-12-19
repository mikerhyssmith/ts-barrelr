# ts-barrelr README
[![VSCodeVersion](http://vsmarketplacebadge.apphb.com/version/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)
[![VSCodeInstalls](http://vsmarketplacebadge.apphb.com/installs/mikerhyssmith.ts-barrelr.svg)](https://marketplace.visualstudio.com/items?itemName=mikerhyssmith.ts-barrelr)



## Features

ts-barrelr automates the production of index.ts barrel files.

Ts-barrelr will produce an index.ts containing all files and folders within the folder containing the current file in the editor window.

Running the barrelr with an existing index.ts will update it with any changes to files within the folder.


## Upcoming Features
Recursive barreling - from a directory barrelr will produce index.ts files for the current directory and all sub directories.

Excluding files - barrelr will allow you to specify file types to exclude from the barrel for example test files (.spec.ts, .test.ts).
