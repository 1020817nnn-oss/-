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
