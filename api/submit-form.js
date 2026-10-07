// Vercel Serverless Function: POST /api/submit-form
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const customer = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!customer.id) customer.id = 'CUST-' + Date.now();
      if (!customer.code) customer.code = (customer.country === '🇷🇺' ? 'R-' : 'L-') + Math.floor(100000 + Math.random() * 900000);
      if (!customer.status) customer.status = 'ລໍຖ້າກວດສອບ';
      if (!customer.submissionDate) customer.submissionDate = new Date().toISOString();

      return res.status(200).json({
        success: true,
        message: 'ຂໍ້ມູນລູກຄ້າຖືກບັນທຶກລົງໃນຖານຂໍ້ມູນສຳເລັດແລ້ວ',
        customer
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
