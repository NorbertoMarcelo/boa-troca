import { app } from './app';

const port = 3333;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
