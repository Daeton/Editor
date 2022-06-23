
import { ensureDir as ensure } from 'FileSystem'
import * as Paths from 'Paths';


/*
 *  Ensure default files & folders exist.
 */

export default async function initFileSystem(){
    
    const { data } = Paths;
    
    await ensure(data);
}
