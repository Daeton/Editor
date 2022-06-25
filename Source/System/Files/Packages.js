
import { packages as path } from 'Paths'
import { parse } from 'YAML'
import { walk } from 'FileSystem'
import { join } from 'Path'


const { log } = console;


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
        await loadPackage(entry.path);
}


const { readTextFile , errors } = Deno;
const { NotFound } = errors;

async function loadPackage(path){
    
    let manifest;
    
    try {
        
        const path_manifest = join(path,'Package.yaml');
        
        const yaml = await readTextFile(path_manifest);
        
        manifest = parse(yaml);
                
    } catch ( error ) {

        if(error instanceof NotFound)
            console.error(
                'Package doesn\'t contain a manifest.' + '\n' +
                'Package folder: ' + path);
        else
            throw error;
            
        return;
    }
    
    
    log(manifest);
}
