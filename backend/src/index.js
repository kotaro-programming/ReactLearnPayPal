const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express!',
    time: new Date().toISOString()
  });
});

app.get('/api/user', (req, res) => {
  res.json({
    id: 1,
    name: 'テストユーザー',
    email: 'test@example.com'
  });
});

app.listen(PORT, () => {
  console.log(`API server is running at http://localhost:${PORT}`);
});
