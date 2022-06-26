

import { toFileUrl } from 'Path'

const { log } = console;


const worker_options = {
    type : 'module' ,
    deno : {
        namesapce : true ,
        permissions : 'inherit'
    }
}


export default class Thread {

    #listeners = new EventTarget;
    #closed = false;
    #worker;
    
    constructor(file){
        
        this.#worker = new Worker(toFileUrl(file),worker_options);
        
        this.#listen('messageerror',console.error);
        this.#listen('message',(event) => this.#onMessage(event));
        this.#listen('error',console.error);
        
        this.listenTo('closed',() => {
            // this.#worker.terminate();
            this.#closed = true;
        });
    }
    
    async terminate(){
        
        if(this.#closed)
            return;
            
        await new Promise((resolve) => {
            this.#send('close');
            this.listenTo('closed',resolve);
        });
    }
    
    #onMessage(event){
        
        const { data } = event;
        
        const { type , ...args } = data;
        
        this.#listeners.dispatchEvent(
            new MessageEvent(type,{ data : args }));
    }
    
    #send(type,args = {}){
        this.#worker.postMessage({ ...args , type });
    }
    
    #listen(event,callback){
        this.#worker.addEventListener(event,callback);
    }
    
    listenTo(event,callback){
        this.#listeners.addEventListener(event,callback);
    }
    
    onReady(callback){
        this.listenTo('ready',callback);
    }
    
    onClose(callback){
        this.listenTo('closed',callback);
    }
}
