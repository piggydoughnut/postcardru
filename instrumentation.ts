export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Global error handlers for server-side
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);
    });
  }
}
