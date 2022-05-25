let GIO_SDK_HOST = 'http://test.com/';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ gio_host: GIO_SDK_HOST });
    // console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.storage.onChanged.addListener((changes, area) => {
//     console.log('changes:', changes);
//     // if (area === 'sync' && changes.color?.newValue) {
//     //     const debugMode = Boolean(changes.color.newValue);
//     //     console.log('enable debug mode?', debugMode);
//     //     // setDebugMode(debugMode);
//     //     window.gTag = function() {
//     //         console.log('gTag!');
//     //     }
//     //   }
// });