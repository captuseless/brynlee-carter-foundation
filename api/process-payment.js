// api/process-payment.js
const { SquareClient, SquareEnvironment } = require('square');
const { randomUUID } = require('crypto');

const client = new SquareClient({
  token: process.env.SQAURE_ACCESS_TOKEN,
  environment: SquareEnvironment.Production,
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sourceId, amount, registrationData } = req.body;

    if (!sourceId || !amount || !registrationData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      note: registrationData.captainName,
      buyerEmailAddress: registrationData.captainEmail,
    });

    const payment = response.payment;
    console.log('Payment successful:', payment);

    return res.status(200).json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
    });

  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({
      error: 'Payment failed',
      details: error.message,
    });
  }
};
