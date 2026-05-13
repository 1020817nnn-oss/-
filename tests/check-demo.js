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
assert.equal(packageJson.scripts.test, "node tests/check-demo.js && node tests/check-interaction.js", "test script should run both checks");

assert.match(layout, /倪俊明工业设计作品集/, "metadata title should describe the portfolio");
assert.match(layout, /鼠标产品从手绘探索到原型验证/, "metadata description should describe the site");
assert.match(layout, /lang: "zh-CN"/, "root html should use Chinese language metadata for the current content");
assert.match(layout, /import "\.\/globals\.css"/, "root layout should load global styles");

assert.match(page, /"use client"/, "page should remain a client component for interaction state");
assert.match(page, /export const featuredProjects/, "page should export project data for tests and reuse");
assert.match(page, /export const processSteps/, "page should export process data for tests and reuse");
assert.match(page, /工业设计作品集/, "hero should include the target role");
assert.match(page, /从使用问题、手绘发散、模型验证到最终形态/, "hero should include positioning copy");
assert.match(page, /aria-label": "Primary navigation"/, "navigation should be accessible");
assert.match(page, /data-section": "hero"/, "hero section should expose a stable section marker");
assert.match(page, /data-section": "work"/, "work section should expose a stable section marker");
assert.match(page, /data-section": "process"/, "process section should expose a stable section marker");
assert.match(page, /data-section": "about"/, "about section should expose a stable section marker");
assert.match(page, /data-section": "contact"/, "contact section should expose a stable section marker");
assert.match(page, /data-selected-project": selectedProject/, "project area should track selected project");
assert.match(page, /aria-pressed/, "project buttons should expose selected state");
assert.match(page, /onKeyDown/, "project buttons should support keyboard selection");
assert.match(page, /getTiltStyles/, "page should export a tilt helper");
assert.match(page, /project-palm-support-mouse/, "mouse case study should be embedded as a featured project");
assert.match(page, /掌托支撑鼠标/, "mouse case study should use Chinese project copy");
assert.match(page, /mouse-gallery/, "project detail should render the mouse image gallery when assets exist");

const projectIds = page.match(/id: "project-[a-z-]+"/g) || [];
assert.equal(projectIds.length, 5, "homepage should define exactly five featured projects");
assert.match(page, /"data-layout": "spread"/, "project list should explicitly use a spread layout");
assert.match(page, /className: "card-line-field"/, "project cards should include line-field detailing");
assert.match(page, /className: "card-grid-lines"/, "project cards should include grid-line detailing");
assert.match(page, /className: "card-signal-lines"/, "project cards should include signal-line detailing");

for (const expected of ["形态推敲", "CMF", "Prototype", "人体工学", "User Scenario", "Material Study"]) {
  assert.match(page, new RegExp(expected), `page should include ${expected} as an industrial design keyword`);
}

for (const expected of ["研究", "手绘", "建模", "验证", "细化", "呈现"]) {
  assert.match(page, new RegExp(`label: "${expected}"`), `process should include ${expected}`);
}

assert.match(css, /:root/, "styles should define root tokens");
assert.match(css, /--graphite/, "styles should define the graphite color token");
assert.match(css, /--titanium/, "styles should define the titanium accent token");
assert.match(css, /\.hero-product/, "styles should include the hero product visual");
assert.match(css, /\.annotation-line/, "styles should include technical annotation lines");
assert.match(css, /\.project-card/, "styles should include project dossier cards");
assert.match(css, /\.project-list\[data-layout="spread"\]/, "styles should lay project cards out as a flat spread");
assert.match(css, /\.mouse-gallery/, "styles should include the mouse process gallery");
assert.match(css, /\.detail-hero-image/, "styles should include real product image treatment");
assert.match(css, /\.card-line-field/, "styles should render card line-field details");
assert.match(css, /\.card-grid-lines/, "styles should render card grid-line details");
assert.match(css, /\.card-signal-lines/, "styles should render card signal-line details");
assert.match(css, /\.process-rail/, "styles should include the design process rail");
assert.match(css, /\.contact-grid/, "styles should include the contact grid");
assert.match(css, /@keyframes\s+product-float/, "styles should animate the hero product form");
assert.match(css, /@media\s+\(max-width:\s*760px\)/, "styles should include mobile layout rules");
assert.match(css, /prefers-reduced-motion/, "styles should respect reduced motion preferences");
