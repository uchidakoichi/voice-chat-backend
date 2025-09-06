export default function handler(req, res) {
  const dummySubtitles = [
    { speaker: 'remote', text: 'こんにちは！' },
    { speaker: 'remote', text: '元気ですか？' },
    { speaker: 'local', text: 'テストです' }
  ];
  res.status(200).json(dummySubtitles);
}
