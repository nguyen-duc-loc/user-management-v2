import mysql2 from "mysql2/promise";

interface MySQLCache {
  conn: mysql2.Connection | null;
  promise: Promise<mysql2.Connection> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mysql: MySQLCache;
}

let cached = globalThis.mysql;

if (!cached) {
  cached = global.mysql = { conn: null, promise: null };
}

const dbConnect = async (): Promise<mysql2.Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mysql2
      .createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
