let gioHostEle = document.getElementById('host');
chrome.storage.sync.get('gio_host', ({ gio_host }) => {
    gioHostEle.value = gio_host;
})

let hostElement = document.getElementById('host');
hostElement.addEventListener('change', async(e) => {
    chrome.storage.sync.set({ gio_host: e.target.value });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [chrome.runtime.getURL('/js/scripts.js'), 'body'],
        function: injectScript,
    }, () => {
        console.log('scripts load!');
    });
})

const injectScript = (file, node)=>  {
    const gioAdapterEle = document.getElementById('gio_adapter_script');
    if(gioAdapterEle) {
        document.body.removeChild(gioAdapterEle);
    };
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.id = 'gio_adapter_script';
    s.setAttribute('src', file);
    th.appendChild(s);
}