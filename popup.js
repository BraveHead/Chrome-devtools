let gioHostEle = document.getElementById('host');
chrome.storage.sync.get('gio_host', ({ gio_host }) => {
    gioHostEle.value = gio_host;
})

document.getElementById('host_change').addEventListener('click', async() => {
    let hostElement = document.getElementById('host');
    chrome.storage.sync.set({ gio_host: hostElement.value });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [chrome.runtime.getURL('/js/scripts.js'), 'body', hostElement.value],
        function: injectScript,
    }, () => {
        console.log('scripts load!');
    });
})

const injectScript = (file, node, gio_host)=>  {
    const gioAdapterEle = document.getElementById('gio_adapter_script');
    const gioHostContentEle = document.getElementById('gio_host_content');
    if(gioAdapterEle) {
        document.body.removeChild(gioAdapterEle);
    };
    if(gioHostContentEle) {
        document.body.removeChild(gioHostContentEle);
    }
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.id = 'gio_adapter_script';
    s.setAttribute('src', file);
    th.appendChild(s);

    let ht = document.createElement('p');
    ht.setAttribute('host-content', gio_host);
    ht.id = 'gio_host_content';
    th.appendChild(ht);
}