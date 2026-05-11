import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagePath = path.join(root, "package.json");
const configPath = path.join(root, "next.config.js");
const layoutPath = path.join(root, "app/layout.js");
const pagePath = path.join(root, "app/page.js");
const cssPath = path.join(root, "app/globals.css");

assert.ok(fs.existsSync(packagePath), "package.json should exist");
assert.ok(fs.existsSync(configPath), "next.config.js should exist");
assert.ok(fs.existsSync(layoutPath), "app/layout.js should exist");
assert.ok(fs.existsSync(pagePath), "app/page.js should exist");
assert.ok(fs.existsSync(cssPath), "app/globals.css should exist");

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const layout = fs.readFileSync(layoutPath, "utf8");
const page = fs.readFileSync(pagePath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

assert.equal(packageJson.scripts.dev, "next dev", "dev script should start Next.js");
assert.equal(packageJson.scripts.build, "next build", "build script should run Next.js production build");
assert.match(layout, /import "\.\/globals\.css"/, "root layout should load global styles");
assert.match(page, /"use client"/, "page should be a client component for interaction state");
assert.match(page, /aria-label": "Animated interface card showcase"/, "showcase should have an accessible label");
assert.match(page, /"data-selected-card": selectedCard/, "showcase should track the selected card");

const cards = page.match(/id: "[1-5]"/g) || [];
assert.equal(cards.length, 5, "showcase should render exactly five cards");

for (let index = 1; index <= 5; index += 1) {
  assert.match(page, new RegExp(`id: "${index}"`), `card ${index} should have a stable id`);
  assert.match(page, /"data-card": card\.id/, "cards should expose a stable data-card attribute");
  assert.match(page, /`Select card \$\{card\.id\}`/, "cards should have selectable labels");
}

assert.match(css, /@keyframes\s+card-rise/, "styles should include the card entrance animation");
assert.match(css, /prefers-reduced-motion/, "styles should respect reduced motion preferences");
assert.match(css, /backdrop-filter/, "styles should include glass-like backdrop filtering");
assert.match(css, /position:\s*absolute/, "cards should be absolutely positioned for overlapping");
assert.match(css, /\.interface-card\.is-selected/, "styles should include a selected card state");
assert.match(css, /--selected-x/, "styles should let selection move a card out of the stack");

assert.match(page, /onPointerMove/, "component should react to pointer movement for tilt");
assert.match(page, /--tilt-x/, "component should update the tilt x custom property");
assert.match(page, /--tilt-y/, "component should update the tilt y custom property");
assert.match(page, /setSelectedCard/, "component should centralize card selection");
assert.match(page, /aria-pressed/, "component should expose selection state to assistive technology");
assert.match(page, /onKeyDown/, "component should support keyboard selection");
