
import { filterKeys } from 'Filter Keys'
import { parse } from 'YAML'
import { join } from 'Path'
import { configs } from 'Paths'

import activatePackage from './Activate.js'
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
        info : filterKeys(manifest,isInfo) ,
        id : manifest.id ,
        paths : {
            folder : path ,
            activate : join(path,manifest.activate) ,
            configs : join(configs,manifest.id)
        },
        configs : {
            ensure : async function(relative,defaultContent = ''){
                const path = join(pack.paths.configs,relative);
                log(path);
                
                try {
                    const fileDescriptor = await Deno.open(path);
                    
                    Deno.close(fileDescriptor);
                } catch (error) {
                
                    if(error instanceof Deno.errors.NotFound){
                        await Deno.writeTextFile(path,defaultContent,{ create : true });
                        return;
                    }
                    
                    throw error;
                }
            }
        }
    }
    
    log(pack);
    
    await activatePackage(pack);
}
