
import { Webview } from 'WebView'
import { serve } from 'HTTP'

import initFileSystem from './System/Files/Init.js'
import { readVersion } from './Daeton/Version.js'

const { log } = console;


await readVersion();
await initFileSystem();
