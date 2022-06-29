

const { serveHttp , listen } = Deno;

const server = listen({ port: 20000 });


const { log } = console;


postMessage({ type : 'ready' });


for await (const connection of server)
    serveConnection(connection);
    

async function serveConnection (connection){
    for await (const request of serveHttp(connection))
        serveRequest(request);
}

function serveRequest ( event ){
    
    function respond ({ mimetype , content , status = 200 }){
        
        const 
            headers = new Headers({ 'Content-Type' : mimetype }) ,
            response = new Response(content,{ status , headers }) ;

        event.respondWith(response);
    }
    
    
    const { pathname } = new URL(event.request.url);
    
    log(pathname)
    
    switch(true){
    case pathname === '/' :
        servePage(respond);
        return;
    case pathname.startsWith('/Package/') :
        servePackage(respond,pathname.slice(9));
        return;
    default:
        respond({ status : 404 });
        // event.respondWith(new Response({ status : 400 }));
    }
}

function servePage ( respond ){
    
    log('Serving page')
    
    respond({
        mimetype : 'text/html' ,
        content : `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Daeton</title>
                    <script src = '/Package/daetonpackages:file-icons' defer></script>
                </head>
                <body>
                    <h1>Test</h1>
                </body>
            </html>
        `
    });
}

function servePackage ( respond , path ){
    
    log('Package:',path);
    
    const pack = path.split('/')[0];
    
    path = path.slice(pack.length);
    
    log(path)
    
    if(path === ''){
        serveScript( respond , pack , '' );
        return;
    }
    
    if(path.startsWith('/Script/')){
        
        path = path.slice(7);
        
        serveScript( respond , pack , path );
        return;
    }
    
    if(path.startsWith('/Media/')){
        
        path = path.slice(6);
        
        serveMedia( respond , path );
        return;
    }
    
    if(path.startsWith('/Style/')){
        
        path = path.slice(6);
        
        serveStyle( respond , path );
        return;
    }
    
    respond({ status : 404 });
}

async function serveScript ( respond , packId , path ){
    
    log('script',path,packId);
    
    const pack = await packageBy(packId);
    
    log(pack);
    
    if(!pack){
        respond({ status : 404 });
        return;
    }
    
    if(path === '')
        path = pack.paths.interface;
        
    console.log('[a]',path);
    
    const javascript = await Deno.readTextFile(path);
    
    respond({
        mimetype : 'text/javascript' ,
        content : javascript
        // content : `
        //     document.body.style.backgroundColor = 'black';
        // `
    })
}

function serveMedia ( respond , path ){
    
}

function serveStyle ( respond , path ){
    
}



addEventListener('message',processMessage);

function processMessage(event){

    log('onMessage',event);

    if(event.data === 'close')
        self.close();
        
}


function packageBy(id){
    return new Promise((resolve) => {
    
        const listener = addEventListener('message',({ data }) => {
            
            console.log('data',data)
            
            const { type , pack } = data;
            
            if(type === 'packageBy'){
                
                removeEventListener('message',listener);
                resolve(pack);
            }
        })
        
        postMessage({ type : 'packageBy' , id });
    })
}
