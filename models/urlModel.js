import db from "../config/database.js";

const Url = {
  create: (originalUrl,name, urlKey, callback) => {
    const sql = 'INSERT INTO urls (originalURL,name ,urlKey) VALUES (?,?, ?)';
    db.query(sql, [originalUrl,name, urlKey], callback);
  },

  getByKey: (urlKey, callback) => {
    const sql = 'SELECT * FROM urls WHERE urlKey = ?';
    db.query(sql, [urlKey], callback);
  },
  getAnalyticeByKey: (urlKey, callback) => {
    const sql = 'SELECT urlKey, ip_address, city, country, latitude, longitude, device, created_at FROM analytics WHERE urlKey = ?';
    // const sql = 'SELECT {urlKey,ip_address,city,country,latitude,longitude,device,created_at} FROM analytics WHERE urlKey = ?';
    db.query(sql, [urlKey], callback);
  },
  getAboutUrlByKey: (urlKey, callback) => {
    const sql = 'SELECT originalUrl,urlKey,name,created_at FROM urls WHERE urlKey = ?';
    db.query(sql, [urlKey], callback);
  }
};

export default Url;