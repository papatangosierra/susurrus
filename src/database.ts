// Initialize the database and create the tables
import { Database } from "bun:sqlite";

// const db = new Database("data/mydb.sqlite");
const db = new Database(":memory:");

db.exec("PRAGMA journal_mode = WAL;");

let query = db.query(`CREATE TABLE IF NOT EXISTS timers (
  id TEXT PRIMARY KEY,
  name TEXT,
  duration INTEGER,
  startTime INTEGER,
  owner TEXT,
  users TEXT
)`);

query.run();

query = db.query(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT
)`);

query.run();

const logDb = new Database("data/log.sqlite");

logDb.exec("PRAGMA journal_mode = WAL;");

query = logDb.query(`CREATE TABLE IF NOT EXISTS timer_events (
    id TEXT PRIMARY KEY,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    event_type TEXT NOT NULL,  
    timer_id TEXT NOT NULL,
    user_id TEXT,         
    duration INTEGER,        
    concurrent_users INTEGER  
);`);

query.run();

query = logDb.query(`CREATE TABLE IF NOT EXISTS user_events (
    id TEXT PRIMARY KEY,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    event_type TEXT NOT NULL,
    user_id TEXT NOT NULL,
    timer_id TEXT,
    duration INTEGER
);`);

query.run();

export { logDb };
export default db;