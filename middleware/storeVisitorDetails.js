import { UAParser } from 'ua-parser-js';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import db from '../config/database.js';

const storeVisitorDetails = async (req, res, next) => {
    try {
        const parser = new UAParser();
        const userAgent = req.headers['user-agent'];

        const parsedUserAgent = parser.setUA(userAgent).getResult();

        // Fetch location based on IP
        const response = await fetch('https://ipapi.co/json');
        const ipInfo = await response.json();
        const { city, country, latitude, longitude } = ipInfo;

        // Get the urlKey from the request parameters
        const { urlKey } = req.params;

        // Get the device type from the parsed user agent, default to 'Unknown' if undefined
        const deviceType = parsedUserAgent.device.type || 'Laptop';

        // Get the current date and time
        const createdAt = new Date(); // Current date and time

        // Store the visitor details in the analytics table
        const query = `
      INSERT INTO analytics (urlKey, user_agent, ip_address, city, country, latitude, longitude, device, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [
            urlKey,
            JSON.stringify(parsedUserAgent),
            req.socket.remoteAddress,
            city,
            country,
            latitude,
            longitude,
            deviceType,
            createdAt
        ];

        await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
                if (err) {
                    //   console.error('Error storing visitor details:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });

        next();
    } catch (err) {
        // console.error('Error storing visitor details:', err);
        next(err);
    }
};

export default storeVisitorDetails;
