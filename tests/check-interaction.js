const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createElement(dataset = {}) {
  const listeners = {};
  const classes = new Set();
  const attributes = {};

  return {
    dataset,
    listeners,
    attributes,
    style: {
      values: {},
      setProperty(name, value) {
        this.values[name] = value;
      },
    },
    classList: {
      toggle(name, enabled) {
        if (enabled) {
          classes.add(name);
        } else {
          classes.delete(name);
        }
      },
      contains(name) {
        return classes.has(name);
      },
    },
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    setAttribute(name, value) {
      attributes[name] = value;
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: 200, height: 300 };
    },
  };
}

const showcase = createElement({ selectedCard: "3" });
const cards = Array.from({ length: 5 }, (_, index) => createElement({ card: String(index + 1) }));
const script = fs.readFileSync(path.resolve(__dirname, "../script.js"), "utf8");

vm.runInNewContext(script, {
  document: {
    querySelector(selector) {
      assert.equal(selector, ".card-showcase");
      return showcase;
    },
    querySelectorAll(selector) {
      assert.equal(selector, ".interface-card");
      return cards;
    },
  },
});

cards[4].listeners.click();

assert.equal(showcase.dataset.selectedCard, "5", "clicking a card should update the selected card id");
assert.equal(cards[4].attributes["aria-pressed"], "true", "clicked card should be pressed");
assert.equal(cards[4].classList.contains("is-selected"), true, "clicked card should be visually selected");
assert.equal(cards[2].attributes["aria-pressed"], "false", "previous selected card should be unpressed");
assert.equal(cards[2].classList.contains("is-selected"), false, "previous selected card should lose selected class");

let prevented = false;
cards[0].listeners.keydown({
  key: "Enter",
  preventDefault() {
    prevented = true;
  },
});

assert.equal(prevented, true, "keyboard selection should prevent the default Enter action");
assert.equal(showcase.dataset.selectedCard, "1", "Enter should select the focused card");
assert.equal(cards[0].attributes["aria-pressed"], "true", "keyboard-selected card should be pressed");
