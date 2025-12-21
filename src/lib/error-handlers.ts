// Global error handlers - initialize once on server startup
if (typeof window === "undefined") {
  // Only run on server-side
  if (!process.listeners("uncaughtException").length) {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
    });
  }

  if (!process.listeners("unhandledRejection").length) {
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);
    });
  }
}
