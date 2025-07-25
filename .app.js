const express = require('express');
const app = express();
const router = express.Router();
const port = 3030;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log requests
router.get('*', (req, res, next) => {
  res.send('Server ÇÖalışıyor');
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
