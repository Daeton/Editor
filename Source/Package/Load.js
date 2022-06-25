
import { filterKeys } from 'Filter Keys'
import { parse } from 'YAML'
import { join } from 'Path'

import parseManifest from './Manifest/Parse.js'


const { readTextFile } = Deno;
const { log } = console;


const infoProperties = [
    'description' , 'owner' , 'version' , 
    'repository' , 'title' , 'license'
]


const isInfo = (key) =>
    infoProperties.includes(key);


export default async function loadPackage(path){
    
    const path_manifest = join(path,'Package.yaml');
    
    const yaml = await readTextFile(path_manifest);
    
    let data = parse(yaml);
                
    log(data);
    
    const manifest = parseManifest(data);
    
    log(manifest);
    
    const pack = {
        info : filterKeys(manifest,isInfo)
    }
    
    log(pack);
}
