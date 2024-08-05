import AuthUrl from '../models/authUrlModel.js';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

export const createAuthUrl = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
  const originalUrl = req.body.originalUrl;
  const name=req.body.name;
  const urlKey = uid.rnd(); // Generate a unique short URL key

  try {
    await AuthUrl.create(userId, originalUrl,name, urlKey);
    res.status(201).json({
      message: 'Authenticated URL created successfully',
      shortUrl: `${urlKey}`
    });
  } catch (err) {
    
    console.error("Error creating URL:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllAuthUrl = async (req, res) => {
  // console.log(req.user.id)
  const userId = req.user.id;
  // console.log("Received request for userId:", userId);

  try {
    const result = await AuthUrl.getAllAuthUrlByUserId(userId);
    // console.log("Database result:", result);

    if (result.length === 0) {
      // console.warn("URL not found for key:", userId);
      return res.status(404).json({ error: 'URL not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};