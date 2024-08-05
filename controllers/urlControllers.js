import Url from '../models/urlModel.js';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });
export const createUrl = (req, res) => {
  const originalUrl = req.body.originalUrl;
  const name=req.body.name;

  // console.log(req.body)

  const urlKey =uid.rnd();
  // console.log(originalUrl,urlKey)
  Url.create(originalUrl,name, urlKey, (err, result) => {
    if (err) {
        // console.log(err)
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({
        message: 'URL created successfully',
        shortUrl: `${urlKey}`
      });
    }
  });
};

export const redirectUrl = (req, res) => {
  const { urlKey } = req.params;
  
  // console.log("Received request for urlKey:", urlKey); 
  Url.getByKey(urlKey, (err, result) => {
    // console.log(result)
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'URL not found' });
    } else {
      // const originalUrl=result[0].originalURL;
      const originalUrl = result[0].originalUrl;
      // Use 302 status code to indicate a temporary redirect
      res.status(302).set('Location', originalUrl).send();
    }
  });
};




export const getAnalytice = (req, res) => {
  const { urlKey } = req.params;
  Url.getAnalyticeByKey(urlKey, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Analytics not found' });
    } else {
      res.status(200).json(result);
    }
  });
};


export const getAboutUrl = (req, res) => {
  const { urlKey } = req.params;
  Url.getAboutUrlByKey(urlKey, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'URL not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};


