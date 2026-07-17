import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // Позволяет очень просто менять картинки прямо в папке на сервере без пересборки проекта.
  // Express будет отдавать файлы напрямую из физической папки на диске.
  // Мы проверяем несколько возможных путей, чтобы картинки открывались при любом способе запуска и деплоя сервера.
  const possibleImageDirs = [
    path.join(process.cwd(), "images"),
    path.join(process.cwd(), "public/images"),
    path.join(process.cwd(), "dist/images"),
    path.resolve(__dirname, "images"),
    path.resolve(__dirname, "../images"),
    path.resolve(__dirname, "../public/images"),
    path.resolve(__dirname, "public/images"),
    path.resolve(__dirname, "../dist/images"),
  ];

  console.log("=== Checking image directories ===");
  possibleImageDirs.forEach((dir) => {
    try {
      if (fs.existsSync(dir)) {
        console.log(`[FOUND] Registering static route for /images -> ${dir}`);
        app.use("/images", express.static(dir));
      } else {
        console.log(`[NOT FOUND] checked path: ${dir}`);
      }
    } catch (e) {
      console.log(`[ERROR checking path] ${dir}:`, e);
    }
  });
  console.log("==================================");

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "aialmaxxx@gmail.com",
        subject: "Новая заявка на демонстрацию",
        text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}`,
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Определяем distPath динамически в зависимости от структуры папок на сервере
    let distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      if (fs.existsSync(path.join(process.cwd(), 'index.html'))) {
        distPath = process.cwd();
      } else if (fs.existsSync(path.resolve(__dirname, 'index.html'))) {
        distPath = path.resolve(__dirname);
      } else if (fs.existsSync(path.resolve(__dirname, '../dist'))) {
        distPath = path.resolve(__dirname, '../dist');
      }
    }

    console.log(`[PRODUCTION] Serving SPA frontend from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
