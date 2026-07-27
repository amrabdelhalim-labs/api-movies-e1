import app from './app.js';
import { initDB } from './utilities/db.js';
import { createDefaultAdmin } from './utilities/admin.js';

const port = process.env.PORT || 3000;

await initDB();
await createDefaultAdmin();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
