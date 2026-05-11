const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "index.html");
const cssPath = path.join(root, "styles.css");
const jsPath = path.join(root, "script.js");

assert.ok(fs.existsSync(htmlPath), "index.html should exist");
assert.ok(fs.existsSync(cssPath), "styles.css should exist");
assert.ok(fs.existsSync(jsPath), "script.js should exist");

const html = fs.readFileSync(htmlPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const js = fs.readFileSync(jsPath, "utf8");

assert.match(html, /<link[^>]+href="styles\.css"/, "index.html should load styles.css");
assert.match(html, /<script[^>]+src="script\.js"/, "index.html should load script.js");
assert.match(html, /aria-label="Animated interface card showcase"/, "showcase should have an accessible label");
assert.match(html, /data-selected-card="3"/, "showcase should track the selected card");

const cards = html.match(/class="interface-card/g) || [];
assert.equal(cards.length, 5, "showcase should render exactly five cards");

for (let index = 1; index <= 5; index += 1) {
  assert.match(html, new RegExp(`data-card="${index}"`), `card ${index} should have a stable data-card attribute`);
  assert.match(html, new RegExp(`aria-label="Select card ${index}"`), `card ${index} should have a selectable label`);
}

assert.match(css, /@keyframes\s+card-rise/, "styles should include the card entrance animation");
assert.match(css, /prefers-reduced-motion/, "styles should respect reduced motion preferences");
assert.match(css, /backdrop-filter/, "styles should include glass-like backdrop filtering");
assert.match(css, /position:\s*absolute/, "cards should be absolutely positioned for overlapping");
assert.match(css, /\.interface-card\.is-selected/, "styles should include a selected card state");
assert.match(css, /--selected-x/, "styles should let selection move a card out of the stack");

assert.match(js, /pointermove/, "script should react to pointer movement for tilt");
assert.match(js, /--tilt-x/, "script should update the tilt x custom property");
assert.match(js, /--tilt-y/, "script should update the tilt y custom property");
assert.match(js, /setSelectedCard/, "script should centralize card selection");
assert.match(js, /aria-pressed/, "script should expose selection state to assistive technology");
assert.match(js, /keydown/, "script should support keyboard selection");
