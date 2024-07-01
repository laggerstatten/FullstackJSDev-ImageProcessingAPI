import express from 'express';
import logger from './utilities/logger';
import images from './routes/index';

const app: express.Application = express();
const port: number = 3000;

app.use(images);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;






