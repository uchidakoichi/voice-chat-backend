export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Simulated call started');
    res.status(200).json({ status: 'Simulated call started' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
