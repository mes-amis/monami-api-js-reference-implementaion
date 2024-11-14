require('dotenv').config()

const crypto = require('crypto');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Create a webhook with a url of ${req.protocol}://${req.host}/webhooks`)
})

app.post('/webhooks', (req, res) => {
  console.log("Headers:", req.headers);
  const signatureHeader = req.headers['hmac-sha256']?.trim();
  const secret = process.env.MONAMI_SECRET;

  if (!secret) {
    return res.status(500).send("Server configuration error: missing HMAC secret.");
  }

  const verifiedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body), 'utf8')
    .digest('base64')
    .trim();

  if (signatureHeader !== verifiedSignature) {
    const message = "HMAC verification failed. Make sure it's not malicious and check HMAC config."
    console.error("Actual signature:", signatureHeader);
    console.error("Verified signature:", verifiedSignature);
    console.error(message);
    return res.status(403).send(message);
  }

  console.log('Webhook body:', JSON.stringify(req.body, null, 2));
  res.status(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
