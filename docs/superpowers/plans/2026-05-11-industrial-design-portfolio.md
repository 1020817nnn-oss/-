# Industrial Design Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a recruitment-focused product and industrial design portfolio with a future craft visual direction, product-like motion, 3 featured projects, process storytelling, about/resume content, and contact details.

**Architecture:** Keep the existing Next.js app and replace the current interface-card demo with a single-page portfolio. `app/page.js` owns structured portfolio content, interaction helpers, and React components; `app/globals.css` owns the full visual system, responsive layout, motion, and reduced-motion behavior. Tests remain lightweight Node/jsdom checks that verify content, accessibility, interaction state, and important CSS contracts.

**Tech Stack:** Next.js, React client component, CSS custom properties, Node assertion tests, jsdom.

---

## Scope Check

The design spec describes one coherent single-page website. It does not need to be split into separate subsystems. The first implementation should avoid CMS, routing, and heavy Three.js because the spec explicitly calls those out as out of scope for the first version.

## File Structure

- Modify: `app/layout.js`
  - Update metadata and language so the app describes the portfolio rather than the old card demo.
- Replace: `app/page.js`
  - Export structured arrays for `featuredProjects`, `processSteps`, and `contactLinks`.
  - Export `getTiltStyles(rect, clientX, clientY)` for pointer-reactive product/project motion.
  - Render hero, featured projects, process, about/resume, and contact sections.
  - Keep interaction accessible through buttons, `aria-pressed`, and stable `data-*` attributes.
- Replace: `app/globals.css`
  - Implement the future craft visual system, dark hero, technical annotations, project dossier cards, responsive case sections, product-like motion, and reduced-motion safeguards.
- Replace: `tests/check-demo.js`
  - Verify app structure, metadata, exported content arrays, project count, role labels, navigation labels, CSS selectors, and reduced-motion styles.
- Replace: `tests/check-interaction.js`
  - Mount the page in jsdom, verify default selected project, click and keyboard selection, and tilt helper output.
- Keep: `package.json`, `next.config.js`
  - No dependency changes required.

---

### Task 1: Update Static Structure Tests

**Files:**
- Replace: `tests/check-demo.js`
- Test target: `app/layout.js`, `app/page.js`, `app/globals.css`

- [ ] **Step 1: Replace the demo structure test**

Replace `tests/check-demo.js` with:

```js
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

assert.match(layout, /Industrial Design Portfolio/, "metadata title should describe the portfolio");
assert.match(layout, /Product and industrial design portfolio/, "metadata description should describe the site");
assert.match(layout, /lang: "en"/, "root html should use English language metadata for the current content");
assert.match(layout, /import "\.\/globals\.css"/, "root layout should load global styles");

assert.match(page, /"use client"/, "page should remain a client component for interaction state");
assert.match(page, /export const featuredProjects/, "page should export project data for tests and reuse");
assert.match(page, /export const processSteps/, "page should export process data for tests and reuse");
assert.match(page, /Product & Industrial Designer/, "hero should include the target role");
assert.match(page, /Designing physical products from use scenario to refined form/, "hero should include positioning copy");
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

const projectIds = page.match(/id: "project-[a-z-]+"/g) || [];
assert.equal(projectIds.length, 3, "homepage should define exactly three featured projects");

for (const expected of ["Form Study", "CMF", "Prototype", "Ergonomics", "User Scenario", "Material Study"]) {
  assert.match(page, new RegExp(expected), `page should include ${expected} as an industrial design keyword`);
}

for (const expected of ["Research", "Sketch", "Prototype", "Test", "Refine", "Present"]) {
  assert.match(page, new RegExp(`label: "${expected}"`), `process should include ${expected}`);
}

assert.match(css, /:root/, "styles should define root tokens");
assert.match(css, /--graphite/, "styles should define the graphite color token");
assert.match(css, /--titanium/, "styles should define the titanium accent token");
assert.match(css, /\.hero-product/, "styles should include the hero product visual");
assert.match(css, /\.annotation-line/, "styles should include technical annotation lines");
assert.match(css, /\.project-card/, "styles should include project dossier cards");
assert.match(css, /\.process-rail/, "styles should include the design process rail");
assert.match(css, /\.contact-grid/, "styles should include the contact grid");
assert.match(css, /@keyframes\s+product-float/, "styles should animate the hero product form");
assert.match(css, /@media\s+\(max-width:\s*760px\)/, "styles should include mobile layout rules");
assert.match(css, /prefers-reduced-motion/, "styles should respect reduced motion preferences");
```

- [ ] **Step 2: Run the failing structure test**

Run: `npm test`

Expected: FAIL because `app/page.js`, `app/layout.js`, and `app/globals.css` still describe the old animated interface card demo.

- [ ] **Step 3: Commit the failing test**

Run:

```bash
git add tests/check-demo.js
git commit -m "test: define portfolio structure expectations"
```

Expected: Commit succeeds with only `tests/check-demo.js` staged.

---

### Task 2: Update Interaction Tests

**Files:**
- Replace: `tests/check-interaction.js`
- Test target: `app/page.js`

- [ ] **Step 1: Replace the interaction test**

Replace `tests/check-interaction.js` with:

```js
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createElement as h } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import Page, { featuredProjects, getTiltStyles, processSteps } from "../app/page.js";

const dom = new JSDOM("<!doctype html><html><body><div id=\"root\"></div></body></html>", {
  pretendToBeVisual: true,
  url: "http://localhost/",
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.PointerEvent = dom.window.PointerEvent ?? dom.window.MouseEvent;
globalThis.KeyboardEvent = dom.window.KeyboardEvent;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

assert.equal(featuredProjects.length, 3, "portfolio should expose three featured projects");
assert.equal(processSteps.length, 6, "portfolio should expose six process steps");
assert.deepEqual(
  processSteps.map((step) => step.label),
  ["Research", "Sketch", "Prototype", "Test", "Refine", "Present"],
  "process labels should follow the agreed design method",
);

const container = document.getElementById("root");
const root = createRoot(container);

await act(async () => {
  root.render(h(Page));
});

const shell = document.querySelector(".portfolio-shell");
const projectStage = document.querySelector(".project-stage");
const projectButtons = Array.from(document.querySelectorAll(".project-card"));

assert.ok(shell, "portfolio shell should render");
assert.ok(document.querySelector("[data-section='hero']"), "hero should render");
assert.ok(document.querySelector("[data-section='work']"), "work should render");
assert.ok(document.querySelector("[data-section='process']"), "process should render");
assert.ok(document.querySelector("[data-section='about']"), "about should render");
assert.ok(document.querySelector("[data-section='contact']"), "contact should render");

assert.equal(projectStage.dataset.selectedProject, "project-orbit-desk", "first featured project should be selected by default");
assert.equal(projectButtons.length, 3, "three project cards should render");
assert.equal(projectButtons[0].getAttribute("aria-pressed"), "true", "first project should start selected");

await act(async () => {
  projectButtons[1].dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
});

assert.equal(projectStage.dataset.selectedProject, "project-field-lamp", "clicking the second card should update selected project");
assert.equal(projectButtons[1].getAttribute("aria-pressed"), "true", "clicked project should be pressed");
assert.equal(projectButtons[1].classList.contains("is-selected"), true, "clicked project should receive selected class");
assert.equal(projectButtons[0].getAttribute("aria-pressed"), "false", "previous project should be unpressed");

let prevented = false;
const enterEvent = new window.KeyboardEvent("keydown", { bubbles: true, key: "Enter", cancelable: true });
enterEvent.preventDefault = () => {
  prevented = true;
  KeyboardEvent.prototype.preventDefault.call(enterEvent);
};

await act(async () => {
  projectButtons[2].dispatchEvent(enterEvent);
});

assert.equal(prevented, true, "keyboard selection should prevent the default Enter action");
assert.equal(projectStage.dataset.selectedProject, "project-carry-system", "Enter should select the third project");
assert.equal(projectButtons[2].getAttribute("aria-pressed"), "true", "keyboard-selected project should be pressed");

const spaceEvent = new window.KeyboardEvent("keydown", { bubbles: true, key: " ", cancelable: true });

await act(async () => {
  projectButtons[0].dispatchEvent(spaceEvent);
});

assert.equal(projectStage.dataset.selectedProject, "project-orbit-desk", "Space should select the first project");
assert.equal(projectButtons[0].getAttribute("aria-pressed"), "true", "space-selected project should be pressed");

const tiltStyles = getTiltStyles({ left: 0, top: 0, width: 200, height: 300 }, 100, 150);

assert.equal(tiltStyles["--tilt-x"], "0.00deg", "tilt helper should calculate tilt x");
assert.equal(tiltStyles["--tilt-y"], "0.00deg", "tilt helper should calculate tilt y");
assert.equal(tiltStyles["--glow-x"], "50.0%", "tilt helper should calculate glow x");
assert.equal(tiltStyles["--glow-y"], "50.0%", "tilt helper should calculate glow y");

const angledStyles = getTiltStyles({ left: 0, top: 0, width: 200, height: 300 }, 200, 0);

assert.equal(angledStyles["--tilt-x"], "4.50deg", "top edge should tilt toward the viewer");
assert.equal(angledStyles["--tilt-y"], "5.50deg", "right edge should tilt horizontally");
assert.equal(angledStyles["--glow-x"], "100.0%", "glow x should follow pointer");
assert.equal(angledStyles["--glow-y"], "0.0%", "glow y should follow pointer");
```

- [ ] **Step 2: Run the failing interaction test**

Run: `npm test`

Expected: FAIL because `featuredProjects`, `processSteps`, `.portfolio-shell`, and `.project-stage` do not exist yet.

- [ ] **Step 3: Commit the failing test**

Run:

```bash
git add tests/check-interaction.js
git commit -m "test: define portfolio interaction expectations"
```

Expected: Commit succeeds with only `tests/check-interaction.js` staged.

---

### Task 3: Update Metadata

**Files:**
- Replace: `app/layout.js`

- [ ] **Step 1: Replace layout metadata**

Replace `app/layout.js` with:

```js
import { createElement as h } from "react";
import "./globals.css";

export const metadata = {
  title: "Industrial Design Portfolio",
  description: "Product and industrial design portfolio for selected physical product case studies.",
};

export default function RootLayout({ children }) {
  return h(
    "html",
    { lang: "en" },
    h("body", null, children),
  );
}
```

- [ ] **Step 2: Run tests to confirm metadata assertions pass later**

Run: `npm test`

Expected: Still FAIL because the page and CSS have not been rebuilt yet, but metadata-related failures should be gone.

- [ ] **Step 3: Commit metadata change**

Run:

```bash
git add app/layout.js
git commit -m "feat: update portfolio metadata"
```

Expected: Commit succeeds with only `app/layout.js` staged.

---

### Task 4: Replace Page Content and Interaction

**Files:**
- Replace: `app/page.js`

- [ ] **Step 1: Replace the page component**

Replace `app/page.js` with:

```js
"use client";

import { createElement as h, useState } from "react";

export const featuredProjects = [
  {
    id: "project-orbit-desk",
    number: "01",
    title: "Orbit Desk Hub",
    type: "Hybrid work device",
    statement: "A compact desk device designed to reduce cable clutter and make hybrid work setups feel calmer.",
    role: "Industrial Designer",
    tools: "Rhino, KeyShot, Photoshop",
    tags: ["Form Study", "CMF", "User Scenario"],
    constraints: ["Small desk footprint", "Visible cable routing", "Easy one-hand interaction"],
    process: ["Scenario mapping", "Soft block sketching", "Foam volume studies", "Refined shell direction"],
    outcome: "A low-profile hub concept with a tilted interaction surface, hidden cable exit, and warm technical CMF.",
  },
  {
    id: "project-field-lamp",
    number: "02",
    title: "Field Lamp",
    type: "Portable lighting object",
    statement: "A portable lamp concept for small apartments, balancing soft ambient light with a confident carry gesture.",
    role: "Product Designer",
    tools: "Sketching, Blender, KeyShot",
    tags: ["Prototype", "Ergonomics", "Material Study"],
    constraints: ["Stable base", "Comfortable grip", "Low-cost material split"],
    process: ["Grip studies", "Paper models", "Light cone tests", "Handle refinement"],
    outcome: "A handle-led lamp form with a stable weighted base, diffused shade, and tactile material contrast.",
  },
  {
    id: "project-carry-system",
    number: "03",
    title: "Carry System",
    type: "Modular daily carry",
    statement: "A modular carry system exploring how small tools can be stored, accessed, and visually organized.",
    role: "Product & CMF Designer",
    tools: "Rhino, Illustrator, KeyShot",
    tags: ["CMF", "Prototype", "Form Study"],
    constraints: ["Modularity", "Durable surface finish", "Fast visual identification"],
    process: ["Use flow study", "Module proportion tests", "Magnetic mockups", "Color coding"],
    outcome: "A compact modular object family with readable orientation, durable finishes, and a consistent edge language.",
  },
];

export const processSteps = [
  { label: "Research", detail: "Map users, scenes, constraints, and the reason a product should exist." },
  { label: "Sketch", detail: "Explore proportions, gestures, silhouettes, and product families quickly." },
  { label: "Prototype", detail: "Use paper, foam, mockups, or 3D tests to make scale and ergonomics visible." },
  { label: "Test", detail: "Compare handling, stability, assembly logic, and user clarity before refinement." },
  { label: "Refine", detail: "Tune CMF, part lines, radii, details, and presentation hierarchy." },
  { label: "Present", detail: "Build a clear design story from scenario to final physical form." },
];

export const contactLinks = [
  { label: "Email", value: "hello@portfolio.dev", href: "mailto:hello@portfolio.dev" },
  { label: "Resume", value: "PDF available on request", href: "#contact" },
  { label: "Location", value: "Open to product / industrial design roles", href: "#contact" },
];

export function getTiltStyles(rect, clientX, clientY) {
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  const tiltY = (x - 0.5) * 11;
  const tiltX = (0.5 - y) * 9;

  return {
    "--tilt-x": `${tiltX.toFixed(2)}deg`,
    "--tilt-y": `${tiltY.toFixed(2)}deg`,
    "--glow-x": `${(x * 100).toFixed(1)}%`,
    "--glow-y": `${(y * 100).toFixed(1)}%`,
  };
}

function Nav() {
  const links = [
    ["Work", "#work"],
    ["Process", "#process"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return h(
    "nav",
    { className: "site-nav", "aria-label": "Primary navigation" },
    h("a", { href: "#hero", className: "brand-mark" }, "ID / 26"),
    h(
      "div",
      { className: "nav-links" },
      links.map(([label, href]) => h("a", { key: label, href }, label)),
    ),
  );
}

function HeroVisual() {
  const [motionStyle, setMotionStyle] = useState({
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--glow-x": "50%",
    "--glow-y": "18%",
  });

  function handlePointerMove(event) {
    setMotionStyle(getTiltStyles(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY));
  }

  function handlePointerLeave() {
    setMotionStyle({
      "--tilt-x": "0deg",
      "--tilt-y": "0deg",
      "--glow-x": "50%",
      "--glow-y": "18%",
    });
  }

  return h(
    "div",
    {
      className: "hero-product",
      style: motionStyle,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      "aria-label": "Abstract product form with technical annotations",
    },
    h("div", { className: "product-core" }, h("span", { className: "product-lens" }), h("span", { className: "product-slot" })),
    h("span", { className: "annotation-line annotation-line-a" }, "FORM 01"),
    h("span", { className: "annotation-line annotation-line-b" }, "CMF STUDY"),
    h("span", { className: "annotation-line annotation-line-c" }, "PROTOTYPE V03"),
  );
}

function Hero() {
  return h(
    "section",
    { id: "hero", className: "hero-section", "data-section": "hero" },
    h(
      "div",
      { className: "hero-copy" },
      h("p", { className: "eyebrow" }, "Future Craft / Design Lab / Interview Ready"),
      h("h1", null, "Product & Industrial Designer"),
      h("p", { className: "hero-line" }, "Designing physical products from use scenario to refined form."),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { href: "#work", className: "primary-action" }, "View Selected Work"),
        h("a", { href: "#contact", className: "secondary-action" }, "Contact"),
      ),
    ),
    h(HeroVisual),
  );
}

function ProjectCard({ project, isSelected, onSelect }) {
  function handleKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onSelect(project.id);
  }

  return h(
    "button",
    {
      type: "button",
      className: `project-card${isSelected ? " is-selected" : ""}`,
      "data-project": project.id,
      "aria-pressed": String(isSelected),
      onClick: () => onSelect(project.id),
      onKeyDown: handleKeyDown,
    },
    h("span", { className: "project-number" }, project.number),
    h("span", { className: "project-type" }, project.type),
    h("strong", null, project.title),
    h("span", { className: "project-statement" }, project.statement),
    h(
      "span",
      { className: "tag-row" },
      project.tags.map((tag) => h("span", { key: tag }, tag)),
    ),
  );
}

function ProjectDetail({ project }) {
  return h(
    "article",
    { className: "project-detail", "aria-live": "polite" },
    h(
      "div",
      { className: "detail-visual" },
      h("span", { className: "detail-orbit" }),
      h("span", { className: "detail-block" }),
      h("span", { className: "detail-label" }, project.number),
    ),
    h(
      "div",
      { className: "detail-copy" },
      h("p", { className: "eyebrow" }, `${project.role} / ${project.tools}`),
      h("h3", null, project.title),
      h("p", null, project.statement),
      h(
        "div",
        { className: "detail-columns" },
        h("div", null, h("h4", null, "Constraints"), h("ul", null, project.constraints.map((item) => h("li", { key: item }, item)))),
        h("div", null, h("h4", null, "Process"), h("ul", null, project.process.map((item) => h("li", { key: item }, item)))),
      ),
      h("p", { className: "outcome" }, project.outcome),
    ),
  );
}

function Work() {
  const [selectedProject, setSelectedProject] = useState(featuredProjects[0].id);
  const activeProject = featuredProjects.find((project) => project.id === selectedProject) ?? featuredProjects[0];

  return h(
    "section",
    {
      id: "work",
      className: "work-section",
      "data-section": "work",
    },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Selected Work"), h("h2", null, "Three product stories, each built around scenario, constraint, and form.")),
    h(
      "div",
      { className: "project-stage", "data-selected-project": selectedProject },
      h(
        "div",
        { className: "project-list", "aria-label": "Featured projects" },
        featuredProjects.map((project) =>
          h(ProjectCard, {
            key: project.id,
            project,
            isSelected: project.id === selectedProject,
            onSelect: setSelectedProject,
          }),
        ),
      ),
      h(ProjectDetail, { project: activeProject }),
    ),
  );
}

function Process() {
  return h(
    "section",
    { id: "process", className: "process-section", "data-section": "process" },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Design Process"), h("h2", null, "From use context to a refined physical object.")),
    h(
      "ol",
      { className: "process-rail" },
      processSteps.map((step, index) =>
        h(
          "li",
          { key: step.label, style: { "--step": index } },
          h("span", null, String(index + 1).padStart(2, "0")),
          h("strong", null, step.label),
          h("p", null, step.detail),
        ),
      ),
    ),
  );
}

function About() {
  return h(
    "section",
    { id: "about", className: "about-section", "data-section": "about" },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "About"), h("h2", null, "A portfolio built for interviews, not only for impressions.")),
    h(
      "div",
      { className: "about-grid" },
      h("p", null, "I focus on physical product concepts, form development, CMF direction, prototyping, and presentation systems. My work connects user scenarios with tactile, manufacturable product language."),
      h(
        "ul",
        { className: "skill-list" },
        ["Industrial design", "Product strategy", "Sketching", "Rhino", "KeyShot", "CMF", "Prototype storytelling"].map((skill) => h("li", { key: skill }, skill)),
      ),
    ),
  );
}

function Contact() {
  return h(
    "section",
    { id: "contact", className: "contact-section", "data-section": "contact" },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Contact"), h("h2", null, "Available for product and industrial design opportunities.")),
    h(
      "div",
      { className: "contact-grid" },
      contactLinks.map((link) =>
        h(
          "a",
          { key: link.label, href: link.href },
          h("span", null, link.label),
          h("strong", null, link.value),
        ),
      ),
    ),
  );
}

export default function Page() {
  return h(
    "main",
    { className: "portfolio-shell" },
    h(Nav),
    h(Hero),
    h(Work),
    h(Process),
    h(About),
    h(Contact),
  );
}
```

- [ ] **Step 2: Run tests to confirm remaining style failures**

Run: `npm test`

Expected: FAIL because `app/globals.css` still contains the old interface-card visual system and does not include the new portfolio selectors.

- [ ] **Step 3: Commit page replacement**

Run:

```bash
git add app/page.js
git commit -m "feat: build portfolio page structure"
```

Expected: Commit succeeds with only `app/page.js` staged.

---

### Task 5: Replace Visual System and Responsive Styling

**Files:**
- Replace: `app/globals.css`

- [ ] **Step 1: Replace global styles**

Replace `app/globals.css` with the CSS below. Keep the selectors exactly as named because the tests depend on them.

```css
:root {
  color-scheme: dark;
  --graphite: #101312;
  --graphite-2: #171d1b;
  --ink: #f4f1e8;
  --muted: #a9b2aa;
  --soft: #dfe5dc;
  --line: rgba(223, 229, 220, 0.18);
  --titanium: #8ca79b;
  --amber: #c8a15d;
  --panel: rgba(255, 255, 255, 0.065);
  --panel-strong: rgba(255, 255, 255, 0.11);
  --shadow: rgba(0, 0, 0, 0.36);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background:
    radial-gradient(circle at 74% 8%, rgba(140, 167, 155, 0.24), transparent 28rem),
    radial-gradient(circle at 16% 28%, rgba(200, 161, 93, 0.12), transparent 24rem),
    linear-gradient(145deg, #080a0a 0%, var(--graphite) 48%, #1c211f 100%);
}

body::before {
  position: fixed;
  inset: 0;
  pointer-events: none;
  content: "";
  opacity: 0.22;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, transparent, #000 10%, #000 86%, transparent);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.portfolio-shell {
  width: min(1180px, calc(100vw - 32px));
  margin: 0 auto;
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
  backdrop-filter: blur(18px);
}

.brand-mark,
.nav-links a {
  color: var(--soft);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.brand-mark {
  border: 1px solid var(--line);
  padding: 8px 10px;
}

.nav-links {
  display: flex;
  gap: clamp(14px, 3vw, 32px);
}

.hero-section,
.work-section,
.process-section,
.about-section,
.contact-section {
  padding: clamp(72px, 10vw, 126px) 0;
}

.hero-section {
  display: grid;
  min-height: calc(100vh - 68px);
  grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
  align-items: center;
  gap: clamp(34px, 6vw, 82px);
}

.eyebrow {
  margin: 0 0 14px;
  color: var(--titanium);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
h3,
h4,
p {
  margin: 0;
}

h1 {
  max-width: 720px;
  font-size: clamp(48px, 8vw, 108px);
  line-height: 0.92;
  letter-spacing: 0;
}

h2 {
  max-width: 820px;
  font-size: clamp(32px, 5vw, 64px);
  line-height: 1;
  letter-spacing: 0;
}

h3 {
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1;
}

p {
  color: var(--muted);
  line-height: 1.65;
}

.hero-line {
  max-width: 560px;
  margin-top: 24px;
  font-size: clamp(18px, 2vw, 23px);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  padding: 0 18px;
  color: var(--ink);
}

.primary-action {
  background: var(--soft);
  color: #101312;
}

.secondary-action {
  background: rgba(255, 255, 255, 0.045);
}

.hero-product {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --glow-x: 50%;
  --glow-y: 18%;
  position: relative;
  display: grid;
  min-height: clamp(420px, 52vw, 620px);
  place-items: center;
  perspective: 1200px;
}

.product-core {
  position: relative;
  width: min(430px, 78vw);
  aspect-ratio: 1.18;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 38% 28% 34% 24%;
  background:
    radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255, 255, 255, 0.92), transparent 16%),
    linear-gradient(135deg, rgba(239, 241, 232, 0.96), rgba(124, 151, 139, 0.74) 48%, rgba(31, 37, 35, 0.92));
  box-shadow:
    0 48px 120px var(--shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset -34px -38px 70px rgba(0, 0, 0, 0.22);
  transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotate(-12deg);
  transform-style: preserve-3d;
  animation: product-float 6200ms ease-in-out infinite;
}

.product-core::before,
.product-core::after {
  position: absolute;
  content: "";
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.product-core::before {
  inset: 18%;
  border-radius: 999px;
}

.product-core::after {
  right: 14%;
  bottom: 16%;
  width: 30%;
  height: 8%;
  border-radius: 999px;
  background: rgba(16, 19, 18, 0.46);
}

.product-lens,
.product-slot {
  position: absolute;
  display: block;
}

.product-lens {
  top: 18%;
  left: 18%;
  width: 21%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff, #a9bdb3 34%, #18201d 68%);
}

.product-slot {
  right: 18%;
  top: 24%;
  width: 28%;
  height: 10px;
  border-radius: 999px;
  background: rgba(16, 19, 18, 0.5);
}

.annotation-line {
  position: absolute;
  min-width: 116px;
  border-top: 1px solid var(--line);
  color: var(--soft);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.annotation-line::before {
  position: absolute;
  top: -4px;
  width: 7px;
  height: 7px;
  border: 1px solid var(--titanium);
  border-radius: 50%;
  content: "";
}

.annotation-line-a {
  top: 18%;
  left: 4%;
}

.annotation-line-b {
  right: 0;
  top: 48%;
}

.annotation-line-c {
  bottom: 18%;
  left: 12%;
}

.section-heading {
  margin-bottom: 32px;
}

.project-stage {
  display: grid;
  grid-template-columns: minmax(280px, 0.86fr) minmax(0, 1.14fr);
  gap: 22px;
}

.project-list {
  display: grid;
  gap: 12px;
}

.project-card {
  display: grid;
  width: 100%;
  gap: 10px;
  border: 1px solid var(--line);
  padding: 18px;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  background: var(--panel);
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}

.project-card:hover,
.project-card:focus-visible,
.project-card.is-selected {
  border-color: rgba(140, 167, 155, 0.72);
  background: var(--panel-strong);
  transform: translateY(-3px);
  outline: 0;
}

.project-number,
.project-type {
  color: var(--titanium);
  font-size: 12px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.project-card strong {
  font-size: 22px;
}

.project-statement {
  color: var(--muted);
  line-height: 1.5;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-row span {
  border: 1px solid var(--line);
  padding: 6px 8px;
  color: var(--soft);
  font-size: 11px;
}

.project-detail {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.2fr);
  gap: 24px;
  min-height: 100%;
  border: 1px solid var(--line);
  padding: clamp(20px, 3vw, 32px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.035));
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.22);
}

.detail-visual {
  position: relative;
  display: grid;
  min-height: 320px;
  place-items: center;
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

.detail-orbit,
.detail-block {
  position: absolute;
  display: block;
}

.detail-orbit {
  width: 70%;
  aspect-ratio: 1;
  border: 1px solid rgba(140, 167, 155, 0.38);
  border-radius: 50%;
}

.detail-block {
  width: 58%;
  aspect-ratio: 1.3;
  border-radius: 32px;
  background: linear-gradient(135deg, #eef1e9, #7d998d 58%, #222b28);
  transform: rotate(-10deg);
}

.detail-label {
  position: absolute;
  left: 18px;
  bottom: 18px;
  color: var(--amber);
  font-size: 48px;
  font-weight: 700;
}

.detail-copy {
  display: grid;
  align-content: center;
  gap: 18px;
}

.detail-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

h4 {
  margin-bottom: 8px;
  color: var(--soft);
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

ul,
ol {
  margin: 0;
  padding: 0;
}

li {
  color: var(--muted);
  line-height: 1.55;
}

.detail-copy ul {
  padding-left: 18px;
}

.outcome {
  border-left: 2px solid var(--amber);
  padding-left: 14px;
  color: var(--soft);
}

.process-rail {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
  list-style: none;
}

.process-rail li {
  min-height: 220px;
  border: 1px solid var(--line);
  padding: 18px;
  background: var(--panel);
  animation: process-rise 700ms ease both;
  animation-delay: calc(var(--step) * 70ms);
}

.process-rail span {
  color: var(--amber);
  font-size: 12px;
}

.process-rail strong {
  display: block;
  margin: 42px 0 12px;
  color: var(--ink);
  font-size: 20px;
}

.about-grid,
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.9fr);
  gap: 22px;
}

.about-grid > p,
.skill-list,
.contact-grid a {
  border: 1px solid var(--line);
  padding: 22px;
  background: var(--panel);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.skill-list li {
  border: 1px solid var(--line);
  padding: 8px 10px;
  color: var(--soft);
}

.contact-grid a {
  display: grid;
  gap: 8px;
}

.contact-grid span {
  color: var(--titanium);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-grid strong {
  color: var(--ink);
  font-size: clamp(18px, 2vw, 26px);
}

@keyframes product-float {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -16px;
  }
}

@keyframes process-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .hero-section,
  .project-stage,
  .project-detail,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .process-rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .portfolio-shell {
    width: min(100% - 24px, 640px);
  }

  .site-nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    justify-content: space-between;
  }

  .hero-section,
  .work-section,
  .process-section,
  .about-section,
  .contact-section {
    padding: 56px 0;
  }

  .hero-product {
    min-height: 360px;
  }

  .detail-columns,
  .process-rail {
    grid-template-columns: 1fr;
  }

  .process-rail li {
    min-height: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }

  .product-core {
    transform: rotate(-12deg) !important;
  }
}
```

- [ ] **Step 2: Run tests to confirm all assertions pass**

Run: `npm test`

Expected: PASS for both `tests/check-demo.js` and `tests/check-interaction.js`.

- [ ] **Step 3: Commit visual system**

Run:

```bash
git add app/globals.css
git commit -m "feat: add future craft portfolio styling"
```

Expected: Commit succeeds with only `app/globals.css` staged.

---

### Task 6: Build Verification and Browser Review

**Files:**
- No source edits expected unless verification finds a concrete issue.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: PASS. Next.js should compile the portfolio without runtime or lint errors.

- [ ] **Step 2: Start local development server**

Run: `npm run dev`

Expected: Server prints a local URL such as `http://localhost:3000`. If port 3000 is busy, use the port printed by Next.js.

- [ ] **Step 3: Review desktop in browser**

Open the local URL in the in-app browser.

Verify:

- Hero text is visible without overlap.
- The abstract product form renders and moves subtly.
- Navigation links scroll to Work, Process, About, and Contact.
- Three project cards render.
- Clicking each project updates the large detail panel.
- Technical labels and process cards are readable.

- [ ] **Step 4: Review mobile layout**

Use browser responsive tools or a narrow viewport.

Verify:

- Navigation wraps cleanly.
- Hero content stacks above or near the product visual.
- Project cards become single column.
- Project metadata is visible without hover.
- Text does not overflow buttons, cards, or panels.

- [ ] **Step 5: Commit any verification fixes**

If Step 3 or Step 4 requires a source fix, stage only the changed source and test files:

```bash
git add app/page.js app/globals.css tests/check-demo.js tests/check-interaction.js
git commit -m "fix: polish portfolio responsive review"
```

Expected: Commit only when a fix was made. If no fix was made, skip this commit.

---

## Final Verification

Run these commands before calling the work complete:

```bash
npm test
npm run build
```

Expected:

- `npm test` passes both Node checks.
- `npm run build` completes successfully.
- Browser review confirms no obvious overlap, unreadable text, or broken interaction on desktop and mobile.

## Self-Review Notes

- Spec coverage: Hero, featured work, process, about/resume, contact, future craft styling, product-like motion, responsive behavior, reduced-motion handling, and first-version scope are covered by Tasks 3-6.
- Content depth: Project cards and detail panels implement the agreed project template at homepage/detail-summary depth.
- Testing: Static and jsdom interaction tests cover structure, project count, process labels, selection behavior, keyboard support, and tilt helper math.
- Scope control: CMS, blog, complex filtering, and heavy 3D are not included.
