
// import { Webview } from 'WebView'
import { serve } from 'HTTP'

import initFileSystem from './System/Files/Init.js'
import { readVersion } from './Daeton/Version.js'
import { readPackages } from './System/Files/Packages.js'

const { log } = console;


await readVersion();
await initFileSystem();
await readPackages();
