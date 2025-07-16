import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from "cors";
import path from "path";
import { MongoClient } from "mongodb";

const app = express();
const MONGODB_URI = "mongodb+srv://farazabdullah267:SjgRgW3SlAAa05Rl@project.ifut3ay.mongodb.net/";
let db: any;

MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('luxehomes');
    app.locals.db = db;
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ Debug route
app.get('/', (_req, res) => {
  res.send('LuxeHomes API is live!');
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/public'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/public/index.html'));
    });
  }

  const port = 6678;
  app.listen(port, '0.0.0.0', () => {
    console.log(`LuxeHomes Real Estate API server running on port ${port}`);
  });
})();
