// Global error handlers - initialize once on server startup
if (typeof window === "undefined") {
  // Only run on server-side

  // Intercept console.error to filter out ECONNREFUSED errors to localhost
  // Next.js catches these errors and logs them directly, so they never reach
  // uncaughtException/unhandledRejection handlers
  const originalConsoleError = console.error;
  console.error = function (...args) {
    // Check if any argument is an error with ECONNREFUSED to localhost
    for (const arg of args) {
      if (
        arg &&
        typeof arg === "object" &&
        arg.code === "ECONNREFUSED" &&
        (arg.address === "127.0.0.1" || arg.address === "localhost")
      ) {
        // Silently ignore - this is a known Next.js issue in production
        return;
      }
      // Also check error messages/strings
      if (
        typeof arg === "string" &&
        (arg.includes("ECONNREFUSED") || arg.includes("127.0.0.1"))
      ) {
        // Check if it's about localhost connection
        const errorStr = JSON.stringify(args);
        if (errorStr.includes("127.0.0.1") || errorStr.includes("localhost")) {
          // Silently ignore
          return;
        }
      }
    }
    // Call original console.error for all other errors
    return originalConsoleError.apply(console, args);
  };

  // Keep these handlers for other uncaught errors (not ECONNREFUSED)
  if (!process.listeners("uncaughtException").length) {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      console.error("Stack:", err.stack);
    });
  }

  if (!process.listeners("unhandledRejection").length) {
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);
      console.error("Stack:", err?.stack);
    });
  }
}
