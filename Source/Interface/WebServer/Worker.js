
const { serveHttp , listen } = Deno;

const server = listen({ port: 20000 });


postMessage({ type : 'ready' });


for await (const connection of server)
    serve(connection);


async function serve (connection) {

    for await (const request of serveHttp(connection)) {

        const 
            mimetype = 'text/html' ,
            content = '<h1>Test</h1>' ,
            status = 200 ;
        
        
        const headers = new Headers({ 'Content-Type' : mimetype });
        
        const response = new Response(content,{ status , headers });
        
        request.respondWith(response);
    }
}



addEventListener('onmessage',(event) => {
    
    if(event.data === 'close')
        self.close();
});
