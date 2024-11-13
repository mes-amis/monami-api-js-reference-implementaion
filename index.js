require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const verifyRequest = (req, res, next) => {
  const signatureHeader = req.headers['Hmac-SHA256']?.trim();
  const secret = process.env.MONAMI_SECRET;

  if (!secret) {
    return res.status(500).send("Server configuration error: missing HMAC secret.");
  }

  const verifiedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.rawBody || req.body)
    .digest('base64')
    .trim();

  if (signatureHeader !== verifiedSignature) {
    return res.status(403).send("HMAC verification failed. Make sure it's not malicious and check HMAC config.");
  }

  next();
};

app.get('/', (req, res) => {
  res.send(`Create a webhook with a url of ${req.protocol}://${req.host}/webhooks`)
})

app.post('/webhooks', verifyRequest, (req, res) => {
  console.log('Webhook received:', req.body);
  res.status(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
