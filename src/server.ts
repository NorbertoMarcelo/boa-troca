import express from 'express';

const app = express();
const port = 3333;

app.get('/', (request, response) => {
  response.json({ message: 'Hello!!' });
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
