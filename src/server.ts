import type { Server } from "http";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

async function main() {
  const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
