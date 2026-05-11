"use client";

import { createElement as h, useState } from "react";

export const cards = [
  {
    id: "1",
    className: "card-a",
    delay: "0ms",
    z: 1,
    content: h(
      "div",
      { className: "card-shell" },
      h("div", { className: "card-topbar" }, h("span"), h("span"), h("span")),
      h(
        "div",
        { className: "profile-strip" },
        h("div", { className: "avatar mint" }),
        h("div", null, h("h2", null, "Signal Board"), h("p", null, "Active interface set")),
      ),
      h(
        "div",
        { className: "meter-grid" },
        h("span", { style: { "--h": "64%" } }),
        h("span", { style: { "--h": "92%" } }),
        h("span", { style: { "--h": "48%" } }),
        h("span", { style: { "--h": "76%" } }),
      ),
    ),
  },
  {
    id: "2",
    className: "card-b",
    delay: "90ms",
    z: 2,
    content: h(
      "div",
      { className: "card-shell" },
      h("div", { className: "card-topbar compact" }, h("span"), h("span")),
      h("div", { className: "stack-lines" }, h("i"), h("i"), h("i"), h("i")),
      h("div", { className: "tile-row" }, h("span"), h("span"), h("span")),
    ),
  },
  {
    id: "3",
    className: "card-c primary",
    delay: "180ms",
    z: 3,
    content: h(
      "div",
      { className: "card-shell" },
      h(
        "div",
        { className: "hero-panel" },
        h("div", { className: "soft-icon" }),
        h("div", null, h("h1", null, "Components"), h("p", null, "Crafted motion system")),
      ),
      h(
        "div",
        { className: "control-grid" },
        h("span", null, "Layout"),
        h("span", null, "Motion"),
        h("span", null, "Depth"),
        h("span", null, "Polish"),
      ),
    ),
  },
  {
    id: "4",
    className: "card-d",
    delay: "270ms",
    z: 2,
    content: h(
      "div",
      { className: "card-shell" },
      h("div", { className: "timeline" }, h("span"), h("span"), h("span")),
      h("div", { className: "mini-window" }, h("div"), h("div"), h("div")),
      h("div", { className: "caption-pair" }, h("strong", null, "Variant 04"), h("small", null, "Hover ready")),
    ),
  },
  {
    id: "5",
    className: "card-e",
    delay: "360ms",
    z: 1,
    content: h(
      "div",
      { className: "card-shell" },
      h("div", { className: "radar" }, h("span"), h("span"), h("span")),
      h("div", { className: "chip-cloud" }, h("i", null, "Glass"), h("i", null, "Lift"), h("i", null, "Glow")),
    ),
  },
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

function InterfaceCard({ card, isSelected, onSelect }) {
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

  function handleKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onSelect(card.id);
  }

  return h(
    "article",
    {
      className: `interface-card ${card.className}${isSelected ? " is-selected" : ""}`,
      "data-card": card.id,
      role: "button",
      tabIndex: 0,
      "aria-label": `Select card ${card.id}`,
      "aria-pressed": String(isSelected),
      style: {
        "--delay": card.delay,
        "--z": card.z,
        ...motionStyle,
      },
      onClick: () => onSelect(card.id),
      onKeyDown: handleKeyDown,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    },
    card.content,
  );
}

export default function Page() {
  const [selectedCard, setSelectedCard] = useState("3");

  return h(
    "main",
    { className: "stage" },
    h(
      "section",
      {
        className: "card-showcase has-selection",
        "aria-label": "Animated interface card showcase",
        "data-selected-card": selectedCard,
      },
      cards.map((card) =>
        h(InterfaceCard, {
          key: card.id,
          card,
          isSelected: card.id === selectedCard,
          onSelect: setSelectedCard,
        }),
      ),
    ),
  );
}
