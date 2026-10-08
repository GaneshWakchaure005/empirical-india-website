import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Load .env or .env.local file if not already loaded in process.env
function loadEnv() {
  const envPaths = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

// Parse CLI arguments: --name="Admin" --email="admin@example.com" --password="secret"
function getCliArg(flag: string): string | undefined {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith(`${flag}=`)) {
      return args[i].slice(flag.length + 1).replace(/^["']|["']$/g, "");
    }
    if (args[i] === flag && args[i + 1]) {
      return args[i + 1].replace(/^["']|["']$/g, "");
    }
  }
  return undefined;
}

async function runSeed() {
  const name =
    getCliArg("--name") || process.env.ADMIN_NAME || "Administrator";
  const email =
    getCliArg("--email") || process.env.ADMIN_EMAIL || "admin@empiricalindia.com";
  const password =
    getCliArg("--password") || process.env.ADMIN_PASSWORD;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "❌ Error: MONGODB_URI or MONGO_URI is not set in environment or .env file."
    );
    process.exit(1);
  }

  if (!password) {
    console.error(
      "❌ Error: Password is required. Set ADMIN_PASSWORD in .env or pass --password='...'"
    );
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("❌ Error: Password must be at least 6 characters long.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  // Import Admin model dynamically after connection
  const { Admin } = await import("../models/Admin");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const normalizedEmail = email.trim().toLowerCase();

  const existingAdmin = await Admin.findOne({ email: normalizedEmail });

  if (existingAdmin) {
    console.log(`Admin account with email "${normalizedEmail}" exists. Updating credentials...`);
    existingAdmin.name = name.trim();
    existingAdmin.password = hashedPassword;
    existingAdmin.role = "admin";
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log("✅ Admin account credentials updated successfully!");
  } else {
    console.log(`Creating new Admin account for "${normalizedEmail}"...`);
    const newAdmin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });
    console.log("✅ Admin account created successfully! ID:", newAdmin._id.toString());
  }

  console.log(`Details:
- Name: ${name}
- Email: ${normalizedEmail}
- Role: admin
- Active: true
`);

  await mongoose.disconnect();
  console.log("MongoDB disconnected. Done.");
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("❌ Failed to seed admin account:", err);
  process.exit(1);
});
