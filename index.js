import * as path from 'path';

import cors from 'cors';
import express from 'express';
import redirect from 'heroku-ssl-redirect';

import router from './routes.js';

const app = express();

const port = process.env.PORT || 5000;

// redirect from http to https
app.use(redirect.default());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.use(router);

// configure for production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use('*', express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
