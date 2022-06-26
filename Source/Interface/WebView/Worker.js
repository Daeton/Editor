
import { Webview } from 'WebView';


const webview = new Webview;
webview.navigate('http://localhost:20000');


postMessage({ type : 'ready' });

webview.bind('close',() => {
    postMessage({ type : 'closed' });
    self.close();
});

addEventListener('onmessage',(event) => {
    
    if(event.data === 'close')
        webview.terminate();
});

webview.run();
