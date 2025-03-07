require("dotenv").config();
const mysql = require("mysql2");

const myDb = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

function beginTransaction() {
  return new Promise((resolve, reject) => {
    myDb.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.beginTransaction((error) => {
          if (error) {
            connection.release();
            reject(error);
          } else {
            resolve(connection);
          }
        });
      }
    });
  });
}

function rollbackTransaction(connection) {
  return new Promise((resolve, reject) => {
    connection.rollback(() => {
      connection.release();
      resolve();
    });
  });
}

function commitTransaction(connection) {
  return new Promise((resolve, reject) => {
    connection.commit((error) => {
      if (error) {
        reject(error);
      } else {
        connection.release();
        resolve();
      }
    });
  });
}

module.exports = {
  myDb,
  beginTransaction,
  rollbackTransaction,
  commitTransaction,
};
