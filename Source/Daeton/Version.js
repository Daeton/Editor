
import { version as path } from 'Paths'

const { readTextFile } = Deno;
const { log } = console;


let
    major = -1 ,
    build = -1 ,
    fix = -1 ;


/*
 *  Try to read & parse Daetons version.
 */

export async function readVersion(){
    
    const content = await readTextFile(path);
    
    const line = content
        .split('\n')[0]
        .trim();
        
    const parts = line
        .split('.');
        
    if(parts.length !== 3)
        throw '\n' + `Version string must have 3 parts ( X.X.X → 1.1.1 ).` 
            + '\n' + `Input was '${ line }'`;
            
    const digits = parts
        .map((part) => parseInt(part));
        
    if(digits.includes(NaN))
        throw '\n' + `Version digits should be natural numbers.` 
            + '\n' + `Input was '${ digits }'`;
        
    [ major , build , fix ] = digits;
    
    log(`Daeton Version:`,version());
}


export function version(){
    return `${ major }.${ build }.${ fix }`;
}
