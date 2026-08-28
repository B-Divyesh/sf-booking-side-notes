import { EMPTY_DATA, type AppData } from './domain';

const DB_NAME = 'booking-side-notes';
const STORE_NAME = 'local-data';
const STATE_KEY = 'state-v1';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Local storage could not be opened. Check browser privacy settings.'));
  });
}

export async function loadData(): Promise<AppData> {
  const db = await openDb();
  return new Promise<AppData>((resolve, reject) => {
    const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(STATE_KEY);
    request.onsuccess = () => resolve(request.result ?? structuredClone(EMPTY_DATA));
    request.onerror = () => reject(new Error('Your local notes could not be read.'));
  }).finally(() => db.close()) as Promise<AppData>;
}

export async function saveData(data: AppData): Promise<void> {
  const db = await openDb();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(data, STATE_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new Error('Changes could not be saved on this device.'));
  }).finally(() => db.close());
}
