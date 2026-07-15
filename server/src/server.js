import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
==========================================
🚀 GameHub Waitlist API Started
==========================================
🌐 Environment : ${process.env.NODE_ENV}
📡 Port        : ${PORT}
🔗 URL         : http://localhost:${PORT}
==========================================
`);
});