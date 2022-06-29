
import { fromFileUrl , dirname , join } from 'Path'
import Thread from 'Thread'

import { packageBy } from '../../Package/Load.js'


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
        
        thread.registerMethod('packageBy',retrievePackage);
    });
}

export function stopWebServer(){
    thread.terminate();
}


async function retrievePackage({ id }){
    
    const { info , paths } = packageBy(id);
    
    return {
        pack : { id , info , paths }
    }
}
