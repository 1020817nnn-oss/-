import { createElement as h } from "react";
import "./globals.css";

export const metadata = {
  title: "Interface Card Motion Study",
  description: "Animated interface card showcase built with Next.js.",
};

export default function RootLayout({ children }) {
  return h(
    "html",
    { lang: "en" },
    h("body", null, children),
  );
}
