
import { fromFileUrl , dirname , join } from 'Path'
import Thread from 'Thread'

const { log } = console;


const path_worker = join(dirname(fromFileUrl(import.meta.url)),'Worker.js');
let thread;


export function startWebServer(port){
    return new Promise((resolve) => {
        
        log('Starting webserver');

        const thread = new Thread(path_worker);
        
        thread.onReady(resolve);
        
        thread.onClose(() => {
            log('WebServer Closed');
        });
    });
}

export function stopWebServer(){
    thread.terminate();
}
