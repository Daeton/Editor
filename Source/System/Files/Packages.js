
import { packages as path } from 'Paths'
import { walk } from 'FileSystem'

import { loadPackage } from '../../Package/Load.js'


const { log , warn } = console;


/*
 *  Read list of package folders and load them.
 */

export async function readPackages(){
    
    const options = {
        followSymlinks : true ,
        includeFiles : false ,
        inncludeDirs : true ,
        maxDepth : 1
    }
    
    const entries = walk(path,options);
    
    // Skip <path> folder
    await entries.next();
    
    for await (const entry of entries)
        await loadPackage(entry.path)
            .catch(console.error);
}
