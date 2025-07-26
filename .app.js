const express = require('express');
const app = express();
const router = express.Router();
const port = 3030;
const bodyParser = require('body-parser');
const emailPublisher = require('./publisher');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log requests
router.get('*', (req, res, next) => {
  res.send('Server ÇÖalışıyor');
  next();
});

router.post('/register', async (req, res, next) => {
  const { email } = req.body;
  try {
    await emailPublisher(email);
    res.status(200).send('Email registered successfully');
  } catch (error) {
    console.error('Error publishing email:', error);
    res.status(500).send('Error registering email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
