// Initialize the database and create the tables
import { Database } from 'bun:sqlite';

const db = new Database("data/mydb.sqlite");

db.exec("PRAGMA journal_mode = WAL;");

let query = db.query(`CREATE TABLE IF NOT EXISTS timers (
  id TEXT PRIMARY KEY,
  name TEXT,
  duration INTEGER,
  startTime INTEGER,
  isRunning INTEGER,
  owner TEXT,
  users TEXT
)`);

query.run();

query = db.query(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT
)`);

query.run();

export default db;