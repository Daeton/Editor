
import { ensureDir } from 'FileSystem'

const { log } = console;


/*
 *  Start a package
 */

export default async function activatePackage(pack){
    
    await ensureDir(pack.paths.configs);
    
    const path_activate = pack.paths.activate;
    
    const module = await import(path_activate);
    
    if(!module.activate)
        throw `Packge is missing it's activation function.`;
    
    log(`Activating package ${ pack.info.title }`);
    
    await module.activate(pack);
}
