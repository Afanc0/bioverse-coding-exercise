// lib/mongodb.js
import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb+srv://gianromanigr:7ohVvohceWlTvEjc@cluster0.hquxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Function to connect to the database
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    await client.connect();
    const db = client.db('bioverse');
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}