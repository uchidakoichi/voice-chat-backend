let subtitles = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    if (text) {
      subtitles.push({ speaker: 'local', text });
      res.status(200).json({ status: 'Text received' });
    } else {
      res.status(400).json({ error: 'No text provided' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
