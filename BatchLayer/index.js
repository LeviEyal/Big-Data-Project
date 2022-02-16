import express, { json } from 'express';

import controller from './controllers/mongoController.js';

const app = express();
const PORT = process.env.PORT || 3000;

/* Front Middlewares */
app.use(json());

/* Routes */
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/insertToMongoDB', controller.insertToMongoDB);
app.get('/getAll', controller.getAll);

/* Start server */
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});