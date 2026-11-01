import assert from "node:assert/strict";

const base = process.argv[2] || "http://127.0.0.1:3000";
const origin = "https://www.empiricalindia.com";
const headers = { "user-agent": "Googlebot" };
const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
function attr(tag: string, name: string) { return decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || ""); }
function meta(html: string, name: string) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attr(tag, "name") === name || attr(tag, "property") === name).map((tag) => attr(tag, "content"));
}
async function main() {
  const response = await fetch(`${base}/sitemap.xml`, { headers });
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
  assert.ok(urls.length >= 7);
  assert.equal(new Set(urls).size, urls.length);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const internalLinks = new Set<string>();
  for (const url of urls) {
    assert.equal(new URL(url).origin, origin);
    assert.ok(!url.includes("/admin") && !url.includes("/api/"));
    const page = await fetch(new URL(new URL(url).pathname, base), { headers });
    assert.equal(page.status, 200, url);
    const html = await page.text();
    assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `One H1: ${url}`);
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
    assert.ok(title && !titles.has(title), `Unique title: ${url} — ${title}`); titles.add(title);
    assert.ok(!/Empirical India\s*\|\s*Empirical India/i.test(title));
    const description = meta(html, "description");
    assert.equal(description.length, 1, `Description count: ${url}`);
    assert.ok(description[0] && !descriptions.has(description[0]), `Unique description: ${url}`); descriptions.add(description[0]);
    const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].filter((match) => attr(match[0], "rel") === "canonical").map((match) => attr(match[0], "href"));
    assert.deepEqual(canonicals.map((value) => new URL(value).href), [url], `Canonical: ${url}`);
    assert.ok(!meta(html, "robots").some((value) => value.includes("noindex")), `Indexable: ${url}`);
    assert.deepEqual(meta(html, "og:url").map((value) => new URL(value).href), [url]);
    assert.ok(meta(html, "og:image")[0], `Sharing image: ${url}`);
    assert.deepEqual(meta(html, "twitter:card"), ["summary_large_image"]);
    let schemas = 0;
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attr(`<script ${match[1]}>`, "type") === "application/ld+json") { JSON.parse(match[2]); schemas++; }
    }
    assert.ok(schemas >= 1, `JSON-LD: ${url}`);
    for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = attr(match[0], "href");
      if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/_next")) internalLinks.add(new URL(href, base).pathname);
    }
    console.log("SEO passed:", new URL(url).pathname);
  }
  for (const path of internalLinks) {
    const response = await fetch(new URL(path, base), { headers });
    assert.ok(response.status < 400, `Broken internal link: ${path} (${response.status})`);
    await response.body?.cancel();
  }
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes("Disallow: /admin") && robots.includes("Disallow: /api/"));
  assert.ok(robots.includes(`${origin}/sitemap.xml`));
  for (const path of ["/admin/login", "/api/products"]) {
    const response = await fetch(`${base}${path}`, { headers });
    assert.ok(response.headers.get("x-robots-tag")?.includes("noindex"));
    await response.body?.cancel();
  }
  for (const path of ["/blogs?search=forming", "/news?type=event"]) {
    const html = await (await fetch(`${base}${path}`, { headers })).text();
    assert.ok(meta(html, "robots").some((value) => value.includes("noindex")), `Filtered noindex: ${path}`);
  }
  for (const path of ["/blogs/seo-test-does-not-exist", "/news/seo-test-does-not-exist", "/products/seo-test-does-not-exist"]) {
    const response = await fetch(`${base}${path}`, { headers: { "user-agent": "Twitterbot" } });
    assert.equal(response.status, 404, `Missing page: ${path}`);
    await response.body?.cancel();
  }
  const image = await fetch(`${base}/opengraph-image`);
  assert.equal(image.status, 200); assert.ok(image.headers.get("content-type")?.includes("image/png"));
  await image.body?.cancel();
  console.log(`SEO audit passed: ${urls.length} published pages, ${internalLinks.size} internal routes, unique metadata/H1s, canonical/social tags, JSON-LD, crawl controls, filter noindex, missing-page 404s and sharing image.`);
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
