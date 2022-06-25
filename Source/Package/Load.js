
import { parse } from 'YAML'
import { join } from 'Path'

import parseManifest from './Manifest/Parse.js'


const { readTextFile } = Deno;
const { log } = console;


export default async function loadPackage(path){
    
    const path_manifest = join(path,'Package.yaml');
    
    const yaml = await readTextFile(path_manifest);
    
    let data = parse(yaml);
                
    log(data);
    
    const manifest = parseManifest(data);
    
    log(manifest);
}
