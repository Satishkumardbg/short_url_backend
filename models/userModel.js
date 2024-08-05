import db from '../config/database.js';

const User = {
  create: (name, username, password, callback) => {
    const sql = 'INSERT INTO users (name, username, password) VALUES (?, ?, ?)';
    db.query(sql, [name, username, password], callback);
  },
  findByUserName: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
  },
  findById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  },
  getAllUsers: (callback) => {
    const sql = 'SELECT id, name, username FROM users';
    db.query(sql, callback);
  },
  deleteById: (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

export default User;
