import { app } from './app';

const port = 3333;
var timestamp = Date.now();

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port} - ${timestamp}`)
);
