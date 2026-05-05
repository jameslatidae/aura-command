import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Empty for now, ready for future if needed
});
