# 项目说明与协作约定

## 项目概览

这是一个工业设计 / 产品设计作品集网站项目，当前重点展示“掌托支撑鼠标”概念设计案例。项目把设计过程、原型验证、最终形态和作品集叙事整理成一个面向招聘与面试场景的单页网站。

当前实现主要是 Next.js 应用，同时保留了一个早期静态版本 `portfolio.html` 作为参考稿。

## 技术栈

- 框架：Next.js
- UI：React，当前页面使用 `"use client"`，通过 `createElement` 编写组件
- 样式：全局 CSS，文件为 `app/globals.css`
- 测试：Node.js 原生 `assert` + `jsdom`
- 包管理：npm

常用命令：

```powershell
npm run dev
npm run build
npm test
```

## 主要目录与文件

- `app/page.js`：作品集首页的主要内容、组件、交互逻辑和导出的数据结构。
- `app/layout.js`：Next.js 根布局，包含站点 metadata 和 `zh-CN` 语言设置。
- `app/globals.css`：整站视觉系统、响应式布局、动效和 reduced-motion 规则。
- `tests/check-demo.js`：静态结构测试，检查配置、元信息、关键文案、CSS 选择器和数据约定。
- `tests/check-interaction.js`：jsdom 交互测试，检查项目卡片切换、键盘操作、默认选中状态和 `getTiltStyles` 计算。
- `docs/mouse-design-portfolio-brief.md`：鼠标作品集案例的核心 brief，包含项目定位、设计叙事、页面顺序、图片候选和文案草稿。
- `docs/superpowers/specs/2026-05-11-industrial-design-portfolio-design.md`：作品集网站设计规格。
- `docs/superpowers/plans/2026-05-11-industrial-design-portfolio.md`：实现计划与历史任务拆解。
- `public/mouse-design/`：当前网页直接使用的鼠标案例图片素材。
- `outputs/mouse-design-analysis/`：从源 PPT 分析/提取出来的素材与 contact sheet。
- `mouse-design-source.pptx`：鼠标设计项目的源 PPT。
- `portfolio.html`：早期静态单页作品集版本，内容偏英文，可作为视觉和结构参考。

## 当前页面结构

Next.js 首页渲染一个完整单页作品集，包含：

- 导航：`Work` / `Process` / `About` / `Contact` 对应页面锚点。
- Hero：工业设计作品集介绍、设计师姓名、行动按钮和一个可随指针倾斜的产品形态视觉。
- Work：5 个 featured projects，默认选中第一个鼠标项目。
- Project Detail：选中项目的案例详情。鼠标项目会显示真实图片与过程图库；其它项目是较简短的补充案例。
- Process：6 个设计流程步骤。
- About：设计方向、技能与工具。
- Contact：邮箱、作品集补充说明和目标方向。

## 核心内容信息

最重要的真实案例是“掌托支撑鼠标”：

- 方向：人体工学鼠标概念。
- 目标：用较高的后背体量支撑手掌和手指根部，同时保留手指发力空间。
- 过程：发散手绘、仿生形态尝试、数字曲面迭代、3D 打印验证、细节收束。
- 关键迭代：早期瓢虫/高拱仿生方向过厚；3D 打印暴露开口过大、按钮区域脆弱、前倾过陡、后半部体量偏大的问题；最终收束为闭合、圆润、高后背的白色鼠标形态。
- 视觉特征：椭圆曲面、渐消侧面纹理、滚轮挖槽、药丸形侧键、底部分缝。

`docs/mouse-design-portfolio-brief.md` 是理解这个案例的首选文件。

## 素材说明

网页直接引用的素材位于 `public/mouse-design/`：

- `hero.jpeg`：鼠标案例主视觉。
- `sketches.jpeg`：发散手绘。
- `wire-iteration.png`：曲面/线框迭代。
- `prototype-issue.jpeg`：3D 打印验证问题。
- `hand-test.jpeg`：手部关系验证。
- `side-detail.png`：侧面渐消纹理。
- `wheel-detail.png`：滚轮细节。
- `final-top.png`：最终顶视图。
- `contact-sheet.jpg`：素材总览。

更完整的原始提取素材在 `outputs/mouse-design-analysis/media/`，数量较多，改动前先确认是否真的需要进入页面。

## 测试与验证约定

修改页面结构、数据、交互或样式后，优先运行：

```powershell
npm test
```

发布或交付前再运行：

```powershell
npm run build
```

测试依赖一些稳定选择器、导出变量和项目数量，例如：

- `featuredProjects`
- `processSteps`
- `getTiltStyles`
- `.portfolio-shell`
- `.project-card`
- `.mouse-gallery`
- `[data-section="hero"]`
- `[data-selected-project]`

改这些名字时要同步更新测试。

## 编码与内容注意事项

- 项目当前目标语言是中文，`app/layout.js` 设置为 `lang: "zh-CN"`。
- 终端里读取某些中文源码时可能出现乱码显示，但文件内容本意是中文作品集文案。改文案时建议用支持 UTF-8 的编辑方式，并在浏览器里核对显示。
- 页面内容目前直接写在 `app/page.js` 的结构化数组中，没有 CMS 或后端。
- `README.md` 当前几乎为空，项目事实主要分散在 `docs/`、源码和测试里。

## 视觉风格

设计规格中确定的方向是：

- Future Craft
- Design Lab
- Interview Ready

整体应保持工业设计实验室感：深色 graphite 背景、雾白文字、titanium green 辅助色、少量 warm amber 标注色。避免过重霓虹、赛博朋克或紫蓝科技风。

## 协作和文件安全规则

- 禁止批量删除文件或目录。
- 不要使用 `del /s`、`rd /s`、`rmdir /s`、`Remove-Item -Recurse`、`rm -rf`。
- 如需删除文件，只能一次删除一个明确路径的文件，例如：

```powershell
Remove-Item "C:\path\to\file.txt"
```

- 如果需要批量删除文件，应停止操作并请求用户手动删除。
- 当前仓库有许多未提交或已修改文件，改动前用 `git status --short` 确认范围。不要回滚用户已有改动。

