
import { mapKeys } from 'Map Keys';
import { mapValues } from 'Map Values';


const { entries } = Object;
const { warn } = console;


const required_fields = [ 
    'title' , 'version' , 'license' ,
    'github' , 'description' ,
    'activate'
]

const limits = {
    version : 60 ,
    license : 60 ,
    github : 100 ,
    title : 100 ,
    activate : 200
}



export default function parseManifest(data){
    
    data = mapKeys(data,(key) => key.toLowerCase());
    data = mapValues(data,(value) => `${ value }`);
    
    
    //  All fields present ?
    
    for(const field of required_fields)
        if(!(field in data))
            throw `Manifest doesn't contain the required field '${ field }'`;    


    const parsed = {}

    
    //  Fields within limit ?
    
    for(const [ key , limit ] of entries(limits)){
        
        const value = data[key];

        const { length } = value;

        if(length > limit)
            warn(`Package ${ key } is too long ( ${ length } > ${ limit } )`);

        parsed[key] = value.slice(0,limit);
    }
    
    
    const { description } = data;
    
    {
        const parts = description
            .split('\n');
            
        const limit = 120 / Math.min(parts.length,2);
        
        parsed.description = parts
            .map((value) => value.slice(0,limit))
            .splice(0,2);
    }
    
    parsed.activate = data.activate;
        
    
    const { github } = parsed;
    
    if(!/^[0-9a-z]+(-[0-9a-z]+)*\/[0-9a-z]+(-[0-9a-z]+)*$/i.test(github))
        throw 'Invalid GitHub link';
        
    const [ owner , repository ] = github.split('\/');
    
    const id = `${ owner.toLowerCase() }:${ repository.toLowerCase() }`;
    
    return { ... parsed , owner , repository , id };
}
