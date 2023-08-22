import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  // create a new transaction with readwrite access
  const tx = db.transaction("jate", "readwrite");
  // access the jate object store
  const store = tx.objectStore("jate");
  // put the content to the store
  await store.put({ id: 1, content: content });
  // wait for the transaction to complete
  await tx.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  // access the jate object store and get all records
  const record = await db.get("jate", 1);
  return record ? record.content : null;
};
initdb();
