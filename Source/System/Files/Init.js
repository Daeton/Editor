
import { ensureDir as ensure } from 'FileSystem'
import * as Paths from 'Paths';


/*
 *  Ensure default files & folders exist.
 */

export default async function initFileSystem(){
    
    const { packages , configs , data } = Paths;
    
    await ensure(data);
    await ensure(packages);
    await ensure(configs);
}
