import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createElement as h } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import Page, { featuredProjects, getDragRotation, getTiltStyles, processSteps } from "../app/page.js";

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

assert.equal(featuredProjects.length, 5, "portfolio should expose five featured projects");
assert.equal(processSteps.length, 6, "portfolio should expose six process steps");
assert.deepEqual(
  processSteps.map((step) => step.label),
  ["研究", "手绘", "建模", "验证", "细化", "呈现"],
  "process labels should follow the agreed design method",
);

const container = document.getElementById("root");
const root = createRoot(container);

await act(async () => {
  root.render(h(Page));
});

const shell = document.querySelector(".portfolio-shell");
const projectStage = document.querySelector(".project-stage");
const projectList = document.querySelector(".project-list");
const projectButtons = Array.from(document.querySelectorAll(".project-card"));

assert.ok(shell, "portfolio shell should render");
assert.ok(document.querySelector("[data-section='hero']"), "hero should render");
assert.ok(document.querySelector("[data-section='work']"), "work should render");
assert.ok(document.querySelector("[data-section='process']"), "process should render");
assert.ok(document.querySelector("[data-section='about']"), "about should render");
assert.ok(document.querySelector("[data-section='contact']"), "contact should render");
assert.ok(document.querySelector(".hero-product-stage"), "hero should render the interactive product stage");
assert.ok(document.querySelector(".product-image"), "hero should render the real mouse product image");
assert.equal(document.querySelectorAll(".glass-panel").length, 3, "hero stage should render three glass interface panels");

assert.equal(projectStage.dataset.selectedProject, "project-palm-support-mouse", "first featured project should be selected by default");
assert.equal(projectList.dataset.layout, "spread", "project cards should use a flat spread layout");
assert.equal(projectButtons.length, 5, "five project cards should render");
assert.equal(projectButtons[0].getAttribute("aria-pressed"), "true", "first project should start selected");
assert.equal(document.querySelectorAll(".mouse-gallery figure").length, 6, "mouse case study should render six process images");
assert.ok(document.querySelector(".detail-hero-image"), "mouse case study should render a real hero product image");
assert.equal(document.querySelectorAll(".card-line-field").length, 5, "each project card should render line-field details");
assert.equal(document.querySelectorAll(".card-grid-lines").length, 5, "each project card should render grid-line details");
assert.equal(document.querySelectorAll(".card-signal-lines").length, 5, "each project card should render signal-line details");

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

assert.equal(projectStage.dataset.selectedProject, "project-palm-support-mouse", "Space should select the first project");
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

const dragRotation = getDragRotation({ x: 100, y: 100 }, 160, 70);

assert.equal(dragRotation["--drag-x"], "6.00deg", "drag helper should rotate around x from vertical pointer movement");
assert.equal(dragRotation["--drag-y"], "12.00deg", "drag helper should rotate around y from horizontal pointer movement");
assert.equal(dragRotation["--is-dragging"], "1", "drag helper should expose dragging state for CSS");
