import express from 'express';
import { createUrl, getAboutUrl, getAnalytice, redirectUrl } from '../controllers/urlControllers.js';
import storeVisitorDetails from '../middleware/storeVisitorDetails.js';

const urlRoutes = express.Router();

urlRoutes.post('/create', createUrl);
urlRoutes.get('/:urlKey' ,storeVisitorDetails,redirectUrl);
urlRoutes.get("/analytics/:urlKey",getAnalytice)
urlRoutes.get("/aboutUrl/:urlKey",getAboutUrl)

export default urlRoutes;