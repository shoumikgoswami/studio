// A simple file-based JSON database for mock data
import fs from 'fs/promises';
import path from 'path';
import {
  mockConversations,
  mockUser,
  mockGoals,
  mockPersonas,
} from './initial-data';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, initialize it
    const initialData = {
      conversations: mockConversations,
      user: mockUser,
      goals: mockGoals,
      personas: mockPersonas,
    };
    await writeDb(initialData);
    return initialData;
  }
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getDb() {
  return await readDb();
}

export async function updateDb(updates: any) {
  const currentDb = await readDb();
  const newDb = { ...currentDb, ...updates };
  await writeDb(newDb);
  return newDb;
}
