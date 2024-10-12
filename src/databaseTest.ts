// Initialize the database and create the tables
import { Database } from "bun:sqlite";

const testDb = new Database("data/testdb.sqlite");

testDb.exec("PRAGMA journal_mode = WAL;");

let query = testDb.query(`CREATE TABLE IF NOT EXISTS timers (
  id TEXT PRIMARY KEY,
  name TEXT,
  duration INTEGER,
  startTime INTEGER,
  owner TEXT,
  users TEXT
)`);

query.run();

query = testDb.query(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT
)`);

query.run();

export default testDb;
