import { createElement as h } from "react";
import "./globals.css";

export const metadata = {
  title: "倪俊明工业设计作品集",
  description: "以中文呈现的工业设计作品集，展示鼠标产品从手绘探索到原型验证的完整过程。",
};

export default function RootLayout({ children }) {
  return h(
    "html",
    { lang: "zh-CN" },
    h("body", null, children),
  );
}
