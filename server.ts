import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

let currentFilename = "";
let currentDirname = "";

try {
  // В CommonJS __filename и __dirname доступны нативно
  currentFilename = __filename;
  currentDirname = __dirname;
} catch (e) {
  // В ESM (tsx) разрешаем их через import.meta.url
  try {
    currentFilename = fileURLToPath(import.meta.url);
    currentDirname = path.dirname(currentFilename);
  } catch (err) {
    currentFilename = process.cwd();
    currentDirname = process.cwd();
  }
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  app.use(express.json());

  // Динамически ищет картинки при каждом запросе в возможных папках на сервере.
  // Это позволяет пользователю очень просто менять картинки "на лету" без перезапуска сервера
  // и без пересборки проекта, просто положив их в любую из указанных папок.
  app.get("/images/*", (req, res, next) => {
    const relativePath = req.params[0];
    if (!relativePath) {
      return next();
    }

    const possibleDirs = [
      path.join(process.cwd(), "images"),
      path.join(process.cwd(), "public/images"),
      path.join(process.cwd(), "dist/images"),
      path.resolve(currentDirname, "images"),
      path.resolve(currentDirname, "../images"),
      path.resolve(currentDirname, "../public/images"),
      path.resolve(currentDirname, "public/images"),
      path.resolve(currentDirname, "../dist/images"),
    ];

    for (const dir of possibleDirs) {
      const filePath = path.join(dir, relativePath);
      try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          return res.sendFile(filePath);
        }
      } catch (e) {
        // Игнорируем ошибки доступа к путям
      }
    }

    next();
  });

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Поддерживаем как простую конфигурацию (Gmail по умолчанию),
      // так и продвинутую SMTP-настройку для корпоративных доменов (@aimaks.ru) через переменные окружения.
      const smtpHost = process.env.EMAIL_HOST;
      const smtpPort = parseInt(process.env.EMAIL_PORT || "465", 10);
      const smtpSecure = process.env.EMAIL_SECURE !== "false"; // По умолчанию true (SSL/TLS)

      let transporter;

      if (smtpHost) {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      } else {
        // Резервный вариант для Gmail, если EMAIL_HOST не задан
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      }

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
      } else if (fs.existsSync(path.resolve(currentDirname, 'index.html'))) {
        distPath = path.resolve(currentDirname);
      } else if (fs.existsSync(path.resolve(currentDirname, '../dist'))) {
        distPath = path.resolve(currentDirname, '../dist');
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
