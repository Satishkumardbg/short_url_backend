import db from '../config/database.js';

const AuthUrl = {
  create: (userId, originalUrl,name, urlKey) => {
    const sql = 'INSERT INTO urls (userId, originalUrl,name, urlKey) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [userId, originalUrl,name, urlKey], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getAllAuthUrlByUserId: (userId) => {
    const sql = 'SELECT * FROM urls WHERE userId = ? ORDER BY id DESC';
    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

export default AuthUrl;