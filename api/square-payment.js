// api/square-payment.js
// Vercel serverless function — place this at /api/square-payment.js in your project root

const { Client, Environment } = require('square');
const { randomUUID } = require('crypto');

const client = new Client({
  accessToken: process.env.SQAURE_ACCESS_TOKEN,
  environment: Environment.Production, // Change to Environment.Sandbox for testing
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sourceId, amount, currency = 'USD', note } = req.body;

  if (!sourceId || !amount) {
    return res.status(400).json({ error: 'Missing sourceId or amount' });
  }

  try {
    const response = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount), // amount in cents, e.g. 54000 for $540.00
        currency,
      },
      note: note || 'Brynlee Carter Memorial Golf Tournament',
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    const payment = response.result.payment;
    return res.status(200).json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
    });

  } catch (err) {
    console.error('Square payment error:', err);

    // Pull out Square's human-readable error if available
    const squareErrors = err?.errors;
    if (squareErrors && squareErrors.length > 0) {
      return res.status(402).json({ error: squareErrors[0].detail || squareErrors[0].code });
    }

    return res.status(500).json({ error: 'Payment processing failed. Please try again.' });
  }
};
