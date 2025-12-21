import mongoose from "mongoose";
import "../lib/error-handlers";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Log connection info for debugging (masked password)
const maskedUri = MONGODB_URI.replace(/:[^:@]+@/, ":****@");
console.log("MongoDB URI:", maskedUri);
console.log("MongoDB URI exists:", !!MONGODB_URI);
console.log("MongoDB URI length:", MONGODB_URI.length);

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  //   if (cached.conn) {
  //     return cached.conn;
  //   }

  const opts = {
    bufferCommands: false,
    // Explicitly disable localhost fallback
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const maskedUri = MONGODB_URI.replace(/:[^:@]+@/, ":****@");

  // Validate that URI doesn't contain localhost
  if (MONGODB_URI.includes("127.0.0.1") || MONGODB_URI.includes("localhost")) {
    throw new Error(`MONGODB_URI contains localhost! URI: ${maskedUri}`);
  }
  console.log("Attempting to connect to MongoDB...");
  console.log("NODE_ENV:", process.env.NODE_ENV);

  cached.promise = mongoose
    .connect(MONGODB_URI, opts)
    .then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
      console.error("Error code:", error.code);
      console.error("Error name:", error.name);
      console.error("Full error:", JSON.stringify(error, null, 2));
      console.error("Attempted URI:", maskedUri);
      throw error;
    });

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
