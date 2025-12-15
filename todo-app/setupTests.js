// Setup file for Vitest + React Testing Library
import '@testing-library/jest-dom';

// Ensure IndexedDB APIs exist in test environment for Dexie
// fake-indexeddb provides global indexedDB, IDBKeyRange, IDB* interfaces
import 'fake-indexeddb/auto';

// Optional: silence Dexie debug logs during tests
// (Dexie logs only in debug builds; this is a safe no-op otherwise)
// globalThis.dexieDebug = false;

// Clean up any Dexie databases between tests to avoid state leak
import Dexie from 'dexie';

afterEach(async () => {
  // Close open DBs and delete our app DB to keep tests isolated
  try {
    // Close any open Dexie instances
    Dexie.getDatabaseNames && (await Dexie.getDatabaseNames());
  } catch (_) {}

  try {
    await Dexie.delete('TodoAppDB');
  } catch (_) {}
});
