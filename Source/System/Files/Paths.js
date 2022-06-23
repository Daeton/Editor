
import { join } from 'Path';

const { env } = Deno;


/*
 *  User Data Folder
 */

export const home = env.get('HOME');

export const data = join(home,'.Daeton');

export const packages = join(data,'Packages');

export const configs = join(data,'Configurations');


/*
 *  Application Data Folder
 */

export const app = join('/','usr','share','Daeton');

export const info = join(app,'Info');

export const version = join(info,'Version');
