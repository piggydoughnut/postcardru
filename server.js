// Load error handlers before anything else
require("./src/lib/error-handlers.js");

// Suppress ECONNREFUSED errors to localhost (known Next.js issue)
const originalEmit = process.emit;
process.emit = function (event, error) {
  if (
    event === "uncaughtException" &&
    error?.code === "ECONNREFUSED" &&
    (error?.address === "127.0.0.1" || error?.address === "localhost")
  ) {
    // Silently ignore - this is a known Next.js issue in production
    return false;
  }
  return originalEmit.apply(this, arguments);
};

// Start Next.js server
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      // Suppress ECONNREFUSED errors
      if (
        err?.code === "ECONNREFUSED" &&
        (err?.address === "127.0.0.1" || err?.address === "localhost")
      ) {
        // Silently ignore
        console.log("ECONNREFUSED error silently ignored");
        return;
      }
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
