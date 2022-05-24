let color = '#3aa757';
let GIO_SDK_HOST = 'www.XXXX.com';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color, gio_host: GIO_SDK_HOST });
    console.log('Default background color set to %cgreen', `color: ${color}`);
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