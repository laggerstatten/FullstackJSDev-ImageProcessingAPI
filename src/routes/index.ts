import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

export default routes;