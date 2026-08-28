import { EMPTY_DATA, type AppData } from './domain';

const STORE_NAME = 'local-data';
const REAL_DB_NAME = 'booking-side-notes';
const DEMO_DB_NAME = 'booking-side-notes-demo';
const REAL_STATE_KEY = 'state-v1';
const DEMO_STATE_KEY = 'demo:state-v1';

export type StorageMode = 'real' | 'demo';

const storageConfig = (mode: StorageMode) => mode === 'demo'
  ? { database: DEMO_DB_NAME, key: DEMO_STATE_KEY }
  : { database: REAL_DB_NAME, key: REAL_STATE_KEY };

function openDb(mode: StorageMode): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(storageConfig(mode).database, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Local storage could not be opened. Check browser privacy settings.'));
  });
}

export async function loadData(mode: StorageMode): Promise<AppData> {
  const db = await openDb(mode);
  return new Promise<AppData>((resolve, reject) => {
    const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(storageConfig(mode).key);
    request.onsuccess = () => resolve(request.result ?? structuredClone(EMPTY_DATA));
    request.onerror = () => reject(new Error('Your local notes could not be read.'));
  }).finally(() => db.close()) as Promise<AppData>;
}

export async function saveData(data: AppData, mode: StorageMode): Promise<void> {
  const db = await openDb(mode);
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(data, storageConfig(mode).key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error('Changes could not be saved on this device.'));
  }).finally(() => db.close());
}

export function discardDemoData(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DEMO_DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Demo data could not be cleared.'));
    request.onblocked = () => reject(new Error('Close other demo tabs, then reset the demo.'));
  });
}
