
import { fromFileUrl , dirname , join } from 'Path'
import Thread from 'Thread'


const { log } = console;


const path_worker = join(dirname(fromFileUrl(import.meta.url)),'Worker.js');

let thread;

export function startWebView(){
    return new Promise((resolve) => {
        thread = new Thread(path_worker);
        
        thread.onReady(resolve);
        
        thread.onClose(() => {
            log('WebView Closed');
        });
    });
}

export function stopWebView(){
    thread.terminate();
}
