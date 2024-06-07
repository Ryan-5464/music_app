
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions

});

contextBridge.exposeInMainWorld('electronAPI', {
    channelSend: (channel, data) => { 
        ipcRenderer.send(channel, data); 
    },
    channelReceive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    removeListener: (channel, func) => ipcRenderer.removeListener(channel, func)
});