"use client";

import { createElement as h, useRef, useState } from "react";

export const featuredProjects = [
  {
    id: "project-palm-support-mouse",
    number: "01",
    title: "掌托支撑鼠标",
    type: "人体工学鼠标概念",
    statement: "一个围绕趴握支撑展开的鼠标形态设计，通过手绘、曲面建模和 3D 打印验证，把柔和外壳转化成更具体的人机关系。",
    role: "工业设计",
    tools: "手绘，Rhino，3D 打印，渲染",
    tags: ["人体工学", "形态推敲", "原型验证"],
    constraints: ["支撑手指根部与掌心", "保留手指发力空间", "让圆润外壳保持统一"],
    process: ["发散手绘", "仿生形态尝试", "数字曲面迭代", "3D 打印验证", "细节与分型面收束"],
    timeline: "基础设计课程作业",
    focus: "趴握舒适性、椭圆曲面构建、侧面渐消触感细节",
    problem: "很多鼠标看起来顺滑，但并没有真正承托手掌和手指根部；如果前端倾角过大，又会压缩手指发力空间。",
    goals: ["用抬高的后背体量承托手掌", "让前端角度更平缓，给手指留下发力空间", "把侧面流线转化成视觉和触觉提示"],
    iteration: ["从大量鼠标轮廓、托手和异形方案中发散，最后收束到圆润趴握方向", "尝试瓢虫式高拱仿生结构，但第一版模型显得厚重", "通过 3D 打印发现开口过大、按键脆弱、前倾过陡和后半部肥大的问题", "最终去掉大开口和过大倾角，保留外部弧线、渐消纹理、滚轮挖槽和底部分缝"],
    finalViews: ["高后背支撑体量", "侧面渐消纹理与底部分缝", "滚轮挖槽和药丸形侧键"],
    reflection: "这次项目让我意识到，设计不是把所有想法都塞进一个产品，而是在迭代中保护一个最清晰的意图。手绘负责打开方向，建模负责把形体说清楚，实体打印则把屏幕上看不到的问题暴露出来。",
    outcome: "最终方案是一个白色、圆润、高后背的趴握鼠标概念，用椭圆曲面、流线分缝和渐消侧面纹理把支撑感变成可见的产品语言。",
    images: {
      hero: "/mouse-design/hero.jpeg",
      gallery: [
        { src: "/mouse-design/sketches.jpeg", label: "发散手绘", caption: "从托手、前端形态、薄片和异形轮廓里寻找可能性。" },
        { src: "/mouse-design/wire-iteration.png", label: "曲面迭代", caption: "用椭圆曲线和混接面整理上表面与侧面关系。" },
        { src: "/mouse-design/prototype-issue.jpeg", label: "3D 打印验证", caption: "实体模型暴露了开口、前倾角和后半部体量的问题。" },
        { src: "/mouse-design/hand-test.jpeg", label: "手部关系", caption: "高后背支撑手指根部，同时保留手指发力空间。" },
        { src: "/mouse-design/side-detail.png", label: "渐消纹理", caption: "侧面纹理丰富光影，也提示手部停留区域。" },
        { src: "/mouse-design/wheel-detail.png", label: "滚轮细节", caption: "挖槽和分缝让白色外壳有更清晰的结构层次。" },
      ],
    },
  },
  {
    id: "project-shell-compact",
    number: "02",
    title: "仿生贝壳粉底盒",
    type: "趣味装饰便携粉底盒",
    statement: "以贝壳开合结构组织镜面、粉盘和粉扑，让随身补妆动作变成可展示的小型仪式。",
    role: "产品设计 / CMF 表达",
    tools: "Sketching, Rhino, Blender, KeyShot",
    tags: ["仿生设计", "美妆容器", "CMF"],
    constraints: ["贝壳识别度", "镜面开合角度", "粉扑与粉盘收纳"],
    process: ["场景定义", "仿生形态提取", "结构拆分", "CMF 渲染", "情绪化展示"],
    timeline: "课程项目",
    focus: "贝壳仿生、便携补妆结构、装饰性美妆产品表达",
    problem: "随身补妆需要同时处理镜面角度、粉扑拿取、粉盘保护和卫生收纳；普通粉底盒功能清楚但记忆点弱，过度装饰的容器又容易牺牲结构逻辑。",
    goals: ["用贝壳开合姿态整合镜子、粉盘和粉扑", "让中心粉扑同时成为抓取提示和珍珠意象", "通过白瓷、浅粉和金属件建立轻盈的美妆 CMF"],
    iteration: ["从通勤、旅行和桌面补妆场景中定义便携需求", "提取贝壳的波浪外缘、放射肋纹和开合结构", "用爆炸图拆分上盖、下盖、镜子、粉盘、粉扑和限位件", "用粉色台阶和桌面场景强化礼品感与装饰属性"],
    finalViews: ["贝壳开合式上盖与镜面", "浅粉内盘与中心珍珠化粉扑", "白瓷外壳、金属转杆和限位结构"],
    reflection: "这次项目让我意识到，仿生设计不应该停在外形相似。更重要的是找到自然形态背后的动作逻辑：贝壳的开合、珍珠的中心意象和放射纹理的方向感，都可以被转译成产品结构和用户体验。",
    outcome: "一个兼具便携补妆、桌面装饰和礼品化表达的贝壳仿生粉底盒概念。",
    images: {
      hero: "/shell-compact/shell-compact-open-hero.jpg",
      gallery: [
        { src: "/shell-compact/shell-compact-presentation-board.jpg", label: "项目总览", caption: "展示使用场景、三视图、爆炸结构和核心细节。" },
        { src: "/shell-compact/shell-compact-open-angle.jpg", label: "开合姿态", caption: "上盖镜面和下盖粉盘形成类似打开贝壳的补妆姿态。" },
        { src: "/shell-compact/shell-compact-puff-detail.jpg", label: "粉扑细节", caption: "中心圆球借用珍珠意象，也提示粉扑的抓取位置。" },
        { src: "/shell-compact/shell-compact-lifestyle-scene.jpg", label: "桌面场景", caption: "产品打开后具有装饰性，适合出现在梳妆台或随身补妆场景中。" },
      ],
    },
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
    timeline: "7 weeks",
    focus: "Modular storage, fast recognition, and durable daily-carry finishes",
    problem: "Compact tools were easy to lose inside bags because similar shapes, colors, and access points created slow search moments.",
    goals: ["Make each module identifiable in under a second", "Keep the family visually consistent", "Protect high-contact edges from early wear"],
    iteration: ["Mapped pocket-to-desk access sequences", "Tested magnetic attachment strength with mockups", "Reworked color blocking for orientation and hierarchy"],
    finalViews: ["Three-module family layout", "Magnetic alignment detail", "Color-coded caps and durable edge language"],
    reflection: "The useful insight was that modularity depends as much on recognition and ritual as it does on attachment mechanics.",
    outcome: "A compact modular object family with readable orientation, durable finishes, and a consistent edge language.",
  },
  {
    id: "project-air-monitor",
    number: "04",
    title: "Air Monitor",
    type: "Home sensing object",
    statement: "A compact air-quality object that makes invisible room conditions readable without feeling clinical.",
    role: "Product Designer",
    tools: "Rhino, Blender, KeyShot",
    tags: ["CMF", "User Scenario", "Prototype"],
    constraints: ["Readable from distance", "Vent geometry", "Soft domestic presence"],
    process: ["Room context mapping", "Vent pattern studies", "Display hierarchy", "Material split refinement"],
    timeline: "5 weeks",
    focus: "Ambient sensing, readable feedback, and domestic product language",
    problem: "Air quality devices often communicate like instruments, which makes them feel anxious in calm home spaces.",
    goals: ["Make status legible without numeric overload", "Use vents as a visual identity system", "Keep the object quiet enough for living rooms"],
    iteration: ["Compared vertical and horizontal vent fields", "Tested three display distances", "Moved the status band into the product waistline"],
    finalViews: ["Soft rectangular body", "Wrapped vent detail", "Subtle light band for status"],
    reflection: "The object became more believable once the vent pattern stopped being decoration and started organizing the whole face.",
    outcome: "A calm air monitor concept with a wrapped vent field, soft light status, and restrained domestic CMF.",
  },
  {
    id: "project-studio-controller",
    number: "05",
    title: "Studio Controller",
    type: "Creative desk tool",
    statement: "A tactile controller for creative software, designed around fast recognition, finger travel, and desk presence.",
    role: "Industrial Designer",
    tools: "Sketching, Rhino, Illustrator",
    tags: ["Ergonomics", "Form Study", "Material Study"],
    constraints: ["Low desk height", "One-hand operation", "Distinct touch zones"],
    process: ["Workflow mapping", "Control spacing tests", "Knob proportion studies", "CMF blocking"],
    timeline: "6 weeks",
    focus: "Creative workflows, tactile controls, and desktop affordance",
    problem: "Software shortcuts are powerful but invisible, forcing creators to remember commands instead of feeling them.",
    goals: ["Make high-frequency controls physically distinct", "Keep the hand position relaxed", "Use surface breaks to guide touch"],
    iteration: ["Mapped edit, zoom, and scrub flows", "Changed knob heights after reach tests", "Separated matte and satin zones for touch clarity"],
    finalViews: ["Low wedge body", "Three tactile control zones", "Directional surface breaks"],
    reflection: "The best version made the interface feel like a small instrument rather than a generic peripheral.",
    outcome: "A low-profile controller concept with readable control zones, tactile material contrast, and a confident desk stance.",
  },
];

export const processSteps = [
  { label: "研究", detail: "确认使用场景、约束、人机问题，以及产品为什么需要存在。" },
  { label: "手绘", detail: "快速探索比例、姿态、轮廓、分型面和产品家族感。" },
  { label: "建模", detail: "用数字模型或实体模型把尺度、曲面和人体工学关系变得可检查。" },
  { label: "验证", detail: "比较握持、稳定性、结构逻辑和用户理解，再决定如何收束。" },
  { label: "细化", detail: "调整 CMF、分缝、圆角、细节和作品集表达层级。" },
  { label: "呈现", detail: "把从问题到最终形体的过程整理成清晰的设计叙事。" },
];

export const contactLinks = [
  { label: "Email", value: "hello@portfolio.dev", href: "mailto:hello@portfolio.dev" },
  { label: "作品集", value: "可继续补充更多课程项目", href: "#work" },
  { label: "方向", value: "工业设计 / 产品设计 / CMF / 原型表达", href: "#contact" },
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

export function getDragRotation(startPoint, clientX, clientY) {
  const dragY = Math.max(-24, Math.min(24, (clientX - startPoint.x) / 5));
  const dragX = Math.max(-18, Math.min(18, (startPoint.y - clientY) / 5));

  return {
    "--drag-x": `${dragX.toFixed(2)}deg`,
    "--drag-y": `${dragY.toFixed(2)}deg`,
    "--is-dragging": "1",
  };
}

function Nav() {
  const links = [
    ["作品", "#work"],
    ["过程", "#process"],
    ["关于", "#about"],
    ["联系", "#contact"],
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
  const dragStartRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [motionStyle, setMotionStyle] = useState({
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--drag-x": "0deg",
    "--drag-y": "0deg",
    "--glow-x": "50%",
    "--glow-y": "18%",
    "--is-dragging": "0",
  });

  function handlePointerMove(event) {
    const tiltStyles = getTiltStyles(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY);

    if (!dragStartRef.current) {
      setMotionStyle((currentStyle) => ({
        ...currentStyle,
        ...tiltStyles,
      }));
      return;
    }

    setMotionStyle({
      ...tiltStyles,
      ...getDragRotation(dragStartRef.current, event.clientX, event.clientY),
    });
  }

  function handlePointerDown(event) {
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setMotionStyle((currentStyle) => ({
      ...currentStyle,
      "--drag-x": "0deg",
      "--drag-y": "0deg",
      "--is-dragging": "1",
    }));
  }

  function endDrag(event) {
    dragStartRef.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setMotionStyle((currentStyle) => ({
      ...currentStyle,
      "--drag-x": "0deg",
      "--drag-y": "0deg",
      "--is-dragging": "0",
    }));
  }

  function handlePointerLeave() {
    if (dragStartRef.current) {
      return;
    }

    setMotionStyle({
      "--tilt-x": "0deg",
      "--tilt-y": "0deg",
      "--drag-x": "0deg",
      "--drag-y": "0deg",
      "--glow-x": "50%",
      "--glow-y": "18%",
      "--is-dragging": "0",
    });
  }

  return h(
    "div",
    {
      className: `hero-product${isDragging ? " is-dragging" : ""}`,
      style: motionStyle,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: handlePointerLeave,
      "aria-label": "鼠标产品形态与技术标注",
      role: "img",
    },
    h(
      "div",
      { className: "hero-product-stage", "aria-hidden": "true" },
      h(
        "span",
        { className: "glass-panel glass-panel-a" },
        h("span", { className: "hud-kicker" }, "ERGONOMIC"),
        h("span", { className: "hud-title" }, "掌托支撑"),
        h("span", { className: "hud-copy" }, "高后背承托手指根部"),
        h("span", { className: "hud-rule" }),
      ),
      h(
        "span",
        { className: "glass-panel glass-panel-b" },
        h("span", { className: "hud-kicker" }, "SURFACE"),
        h("span", { className: "hud-title" }, "椭圆曲面"),
        h("span", { className: "hud-copy" }, "前端保留发力空间"),
        h("span", { className: "hud-line-field" }),
      ),
      h(
        "span",
        { className: "glass-panel glass-panel-c" },
        h("span", { className: "hud-kicker" }, "PROTOTYPE"),
        h("span", { className: "hud-title" }, "3D 打印验证"),
        h("span", { className: "hud-copy" }, "收束开口、倾角和后部体量"),
      ),
      h("span", { className: "product-orbit product-orbit-a" }),
      h("span", { className: "product-orbit product-orbit-b" }),
      h(
        "div",
        { className: "product-core" },
        h("img", { className: "product-image", src: "/mouse-design/hero.jpeg", alt: "" }),
        h("span", { className: "product-edge-glow" }),
      ),
      h("span", { className: "product-shadow" }),
      h("span", { className: "product-reflection" }),
    ),
    h("span", { className: "annotation-line annotation-line-a" }, "高后背支撑"),
    h("span", { className: "annotation-line annotation-line-b" }, "渐消侧纹理"),
    h("span", { className: "annotation-line annotation-line-c" }, "滚轮挖槽 / 药丸侧键"),
  );
}

function Hero() {
  return h(
    "section",
    { id: "hero", className: "hero-section", "data-section": "hero" },
    h(
      "div",
      { className: "hero-copy" },
      h("p", { className: "eyebrow" }, "工业设计 / 课程作业 / 鼠标案例"),
      h("p", { className: "designer-name" }, "倪俊明"),
      h("h1", null, "工业设计作品集"),
      h("p", { className: "hero-line" }, "从使用问题、手绘发散、模型验证到最终形态，整理产品设计背后的判断过程。"),
      h(
        "div",
        { className: "hero-actions" },
        h("a", { href: "#work", className: "primary-action" }, "查看鼠标项目"),
        h("a", { href: "#process", className: "secondary-action" }, "设计流程"),
        h("a", { href: "#contact", className: "secondary-action" }, "联系"),
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
      "aria-current": isSelected ? "true" : undefined,
      onClick: () => onSelect(project.id),
      onKeyDown: handleKeyDown,
    },
    h(
      "span",
      { className: "card-line-field", "aria-hidden": "true" },
      h("span", null),
      h("span", null),
      h("span", null),
      h("span", null),
    ),
    h(
      "span",
      { className: "card-grid-lines", "aria-hidden": "true" },
      h("span", null),
      h("span", null),
      h("span", null),
      h("span", null),
    ),
    h(
      "span",
      { className: "card-signal-lines", "aria-hidden": "true" },
      h("span", null),
      h("span", null),
      h("span", null),
    ),
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
  const hasImages = Boolean(project.images?.hero);

  return h(
    "article",
    { className: `project-detail${hasImages ? " has-real-images" : ""}`, "aria-live": "polite" },
    h(
      "div",
      { className: "detail-visual" },
      hasImages
        ? h("img", { className: "detail-hero-image", src: project.images.hero, alt: `${project.title} 最终渲染图` })
        : [
            h("span", { key: "orbit", className: "detail-orbit" }),
            h("span", { key: "block", className: "detail-block" }),
          ],
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
        { className: "detail-meta" },
        h("div", null, h("span", null, "周期"), h("strong", null, project.timeline)),
        h("div", null, h("span", null, "重点"), h("strong", null, project.focus)),
      ),
      h("section", { className: "case-study-block" }, h("h4", null, "问题"), h("p", null, project.problem)),
      h(
        "div",
        { className: "detail-columns" },
        h("div", null, h("h4", null, "约束"), h("ul", null, project.constraints.map((item) => h("li", { key: item }, item)))),
        h("div", null, h("h4", null, "过程"), h("ul", null, project.process.map((item) => h("li", { key: item }, item)))),
      ),
      project.images?.gallery
        ? h(
            "div",
            { className: "mouse-gallery", "aria-label": "鼠标设计过程图片" },
            project.images.gallery.map((image) =>
              h(
                "figure",
                { key: image.src },
                h("img", { src: image.src, alt: image.label }),
                h("figcaption", null, h("strong", null, image.label), h("span", null, image.caption)),
              ),
            ),
          )
        : null,
      h(
        "div",
        { className: "case-study-grid" },
        h("section", null, h("h4", null, "目标"), h("ul", null, project.goals.map((item) => h("li", { key: item }, item)))),
        h("section", null, h("h4", null, "迭代"), h("ul", null, project.iteration.map((item) => h("li", { key: item }, item)))),
        h("section", null, h("h4", null, "最终特征"), h("ul", null, project.finalViews.map((item) => h("li", { key: item }, item)))),
      ),
      h("p", { className: "outcome" }, project.outcome),
      h("section", { className: "case-study-block" }, h("h4", null, "反思"), h("p", null, project.reflection)),
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
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Selected Work"), h("h2", null, "以真实过程图讲清楚产品从问题到形态的变化。")),
    h(
      "div",
      { className: "project-stage", "data-selected-project": selectedProject },
      h(
      "div",
      { className: "project-list", "data-layout": "spread", "aria-label": "Featured projects", role: "group" },
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
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Design Process"), h("h2", null, "从使用关系到可被验证的实体形态。")),
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
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "About"), h("h2", null, "作品集不只展示结果，也展示判断。")),
    h(
      "div",
      { className: "about-grid" },
      h("p", null, "我关注产品概念、形态推敲、CMF、原型验证和作品集叙事。相比只展示最终渲染，我更希望把“为什么这样改”讲清楚，让每一次迭代都能服务于使用体验。"),
      h(
        "ul",
        { className: "skill-list" },
        ["工业设计", "产品策略", "手绘", "Rhino", "KeyShot", "CMF", "原型叙事"].map((skill) => h("li", { key: skill }, skill)),
      ),
    ),
  );
}

function Contact() {
  return h(
    "section",
    { id: "contact", className: "contact-section", "data-section": "contact" },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, "Contact"), h("h2", null, "继续补充作品、课程项目和设计过程。")),
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
