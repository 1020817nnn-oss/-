import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createElement as h } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import Page, { getTiltStyles } from "../app/page.js";

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

const container = document.getElementById("root");
const root = createRoot(container);

await act(async () => {
  root.render(h(Page));
});

const showcase = document.querySelector(".card-showcase");
const cards = Array.from(document.querySelectorAll(".interface-card"));

assert.equal(showcase.dataset.selectedCard, "3", "showcase should initially select card 3");
assert.equal(cards.length, 5, "showcase should render five interactive cards");

await act(async () => {
  cards[4].dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
});

assert.equal(showcase.dataset.selectedCard, "5", "clicking a card should update the selected card id");
assert.equal(cards[4].getAttribute("aria-pressed"), "true", "clicked card should be pressed");
assert.equal(cards[4].classList.contains("is-selected"), true, "clicked card should be visually selected");
assert.equal(cards[2].getAttribute("aria-pressed"), "false", "previous selected card should be unpressed");
assert.equal(cards[2].classList.contains("is-selected"), false, "previous selected card should lose selected class");

let prevented = false;
const enterEvent = new window.KeyboardEvent("keydown", { bubbles: true, key: "Enter", cancelable: true });
enterEvent.preventDefault = () => {
  prevented = true;
  KeyboardEvent.prototype.preventDefault.call(enterEvent);
};

await act(async () => {
  cards[0].dispatchEvent(enterEvent);
});

assert.equal(prevented, true, "keyboard selection should prevent the default Enter action");
assert.equal(showcase.dataset.selectedCard, "1", "Enter should select the focused card");
assert.equal(cards[0].getAttribute("aria-pressed"), "true", "keyboard-selected card should be pressed");

const spaceEvent = new window.KeyboardEvent("keydown", { bubbles: true, key: " ", cancelable: true });

await act(async () => {
  cards[1].dispatchEvent(spaceEvent);
});

assert.equal(showcase.dataset.selectedCard, "2", "Space should select the focused card");
assert.equal(cards[1].getAttribute("aria-pressed"), "true", "space-selected card should be pressed");

const tiltStyles = getTiltStyles({ left: 0, top: 0, width: 200, height: 300 }, 100, 150);

assert.equal(tiltStyles["--tilt-x"], "0.00deg", "tilt helper should calculate tilt x");
assert.equal(tiltStyles["--tilt-y"], "0.00deg", "tilt helper should calculate tilt y");
assert.equal(tiltStyles["--glow-x"], "50.0%", "tilt helper should calculate glow x");
assert.equal(tiltStyles["--glow-y"], "50.0%", "tilt helper should calculate glow y");
