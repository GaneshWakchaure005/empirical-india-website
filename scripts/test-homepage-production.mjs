// Run after npm run build. No database connection or writes are needed.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { resolve } from "node:path";

const portProbe = createServer();
portProbe.listen(0, "127.0.0.1");
await once(portProbe, "listening");
const port = portProbe.address().port;
await new Promise((resolve, reject) => portProbe.close((error) => error ? reject(error) : resolve()));

const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [
  resolve("node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port),
], {
  env: { ...process.env, NODE_ENV: "production", MONGODB_URI: "", MONGO_URI: "" },
  windowsHide: true,
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
server.stdout.on("data", (chunk) => { logs += chunk; });
server.stderr.on("data", (chunk) => { logs += chunk; });
const exited = once(server, "exit");
let spawnError;
server.on("error", (error) => { spawnError = error; });

try {
  const deadline = Date.now() + 30000;
  while (!logs.includes("Ready in")) {
    if (spawnError) throw spawnError;
    assert.ok(server.exitCode === null && Date.now() < deadline, `Production server did not start:\n${logs}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (const path of ["/", "/products"]) {
    const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, path);
    // A streamed Server Component error can still have HTTP status 200.
    const html = await response.text();
    assert.ok(!html.includes(":E{"), `Server Component error in ${path}`);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, path);
    const section = html.match(/<section[^>]*aria-labelledby="business-lines-heading"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `Missing fallback product section: ${path}`);
    for (const slug of ["roll-forming-lines", "modular-metal-pallets", "trolley-bag-tubes"]) {
      assert.ok(section.includes(`href="/products/${slug}"`), `Missing fallback product: ${slug}`);
    }
    assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https?:\/\//);
    assert.match(html, /<meta[^>]*name="description"[^>]*content="[^"]+"/);
    assert.match(html, /<meta[^>]*property="og:image"/);
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.ok(schemas.length, `Missing JSON-LD: ${path}`);
    for (const schema of schemas) JSON.parse(schema[1]);
  }

  const api = await fetch(`${base}/api/products`, { signal: AbortSignal.timeout(15000) });
  assert.equal(api.status, 500, "Database failures must remain API errors");
  assert.equal((await api.json()).success, false);
  assert.match(logs, /Failed to load published products from database:/);
  assert.match(logs, /Please define the MONGODB_URI/);
  console.log("Production homepage regression passed: missing database configuration preserves homepage/products content and SEO, logs the cause, and retains API failure status.");
} finally {
  server.kill();
  await exited;
}
