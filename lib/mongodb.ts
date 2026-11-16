import mongoose from "mongoose";
import dns from "node:dns";

// When running on Windows/environments where Node's DNS resolver defaults to loopback (127.0.0.1),
// c-ares fails to resolve MongoDB SRV records. Fall back to reliable public DNS resolvers.
try {
  const servers = dns.getServers();
  if (servers.length === 0 || servers.every((s) => s.startsWith("127.") || s === "::1")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch {
  // Ignore if restricted in sandboxed environments
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI (or MONGO_URI) environment variable inside .env"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
