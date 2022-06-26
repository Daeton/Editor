

import initFileSystem from './System/Files/Init.js'
import { readVersion } from './Daeton/Version.js'
import { readPackages } from './System/Files/Packages.js'
import { startWebServer } from './Interface/WebServer/mod.js'
import { startWebView } from './Interface/WebView/mod.js'


await readVersion();
await initFileSystem();
await readPackages();
await startWebServer(20000);
await startWebView();
