// api/process-payment.js
import { Client, Environment } from 'square';

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQAURE_ACCESS_TOKEN,
  environment: Environment.Production, // or Environment.Sandbox for testing
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sourceId, amount, registrationData } = req.body;

    // Validate data
    if (!sourceId || !amount || !registrationData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create payment using Square API
    const { result } = await client.paymentsApi.createPayment({
      sourceId: sourceId,
      amountMoney: {
        amount: amount, // Amount in cents
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      idempotencyKey: `${Date.now()}-${Math.random()}`, // Unique key
      note: `Golf Tournament - ${registrationData.teamName}`,
      buyerEmailAddress: registrationData.captainEmail,
    });

    // Payment successful!
    console.log('Payment successful:', result);

    // TODO: Send confirmation email here
    // TODO: Save to database/spreadsheet

    return res.status(200).json({
      success: true,
      paymentId: result.payment.id,
      status: result.payment.status,
    });

  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({
      error: 'Payment failed',
      details: error.message,
    });
  }
}
