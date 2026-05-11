# Industrial Design Portfolio Website Design

Date: 2026-05-11

## Goal

Create a personal portfolio website for product design and industrial design job applications. The site should help recruiters and interviewers understand the designer's capability within 30 seconds, then provide enough depth for case-study review.

The portfolio should feel memorable and future-facing, but still be easy to scan in a hiring context.

## Target Audience

- Recruiters, hiring managers, and interviewers for product design and industrial design roles.
- Viewers who need to quickly assess design thinking, form development, prototyping ability, and presentation quality.

## Positioning

The portfolio should present the designer as a product and industrial designer who can move from use scenario to physical form.

Recommended positioning line:

> Product & Industrial Designer designing physical products from use scenario to refined form.

## Content Scope

The site should support 3-5 projects, with 3 featured projects on the homepage. Because the available project material still needs planning, the design should emphasize strong project storytelling rather than a large gallery.

## Recommended Approach

Use a future craft visual direction with deep case-study content.

This combines:

- A dark, concept-driven visual identity.
- Product-like motion and technical annotations.
- Interview-friendly structure and readable project narratives.
- A consistent project template that helps uneven source material feel intentional.

## Site Structure

### 1. Hero

The first viewport introduces the designer and establishes an industrial design identity.

Content:

- Name.
- Role: Product & Industrial Designer.
- One-sentence positioning.
- Primary call to action: View Selected Work.
- Secondary action: Resume or Contact.
- A central product-like visual object, either CSS/imagery-based at first or Three.js-based later if a model is available.

Visual behavior:

- Dark graphite background.
- Abstract product form as the visual anchor.
- Subtle rotation, floating, or pointer-reactive movement.
- 2-3 technical annotation lines around the product visual.

### 2. Featured Projects

Show 3 selected projects on the homepage.

Each card includes:

- Strong project image or render.
- Project title.
- Project type.
- One-sentence value statement.
- Role and contribution.
- 3 tags such as Form Study, CMF, Prototype, Ergonomics, User Scenario, or Material Study.

Project cards should feel like product dossiers, not generic web cards.

### 3. Design Process

Show the designer's method as a short process section:

Research -> Sketch -> Prototype -> Test -> Refine -> Present

This section proves the designer is not only presenting final visuals. It should be compact, scannable, and supported by small process images, icons, or annotated fragments.

### 4. Project Details

Each project uses a consistent case-study structure:

1. Project one-liner: who it is for, what problem it solves, and what was designed.
2. Project metadata: type, timeline, role, tools, and focus areas.
3. Problem and use scenario.
4. Design goals and constraints.
5. Exploration process: sketches, form studies, mockups, foam models, paper models, or structure tests.
6. Iteration decisions: what changed and why.
7. Final concept: hero render, detail views, usage scene, structure or exploded view, and CMF.
8. Result or reflection: outcome, learning, or next validation step.

Project details can be implemented as expanded sections or immersive overlays. The first version should favor continuous reading and simple navigation.

### 5. About and Resume

Short section focused on employability.

Content:

- Brief personal introduction.
- Education or background.
- Tools and skills.
- Design interests.
- Resume link.
- Contact links such as email, LinkedIn, Behance, or ZCOOL.

### 6. Contact

Clear, low-friction contact section.

Content:

- Email.
- Location or availability.
- Target role.
- Optional start date.

Avoid marketing copy. The section should be direct and professional.

## Visual Direction

Style keywords:

- Future Craft
- Design Lab
- Interview Ready

The website should feel like a refined industrial design lab: technical, tactile, and controlled.

### Color

Primary:

- Near black.
- Graphite gray.
- Fog white.
- Cool silver.

Accent:

- Titanium green.
- Small amounts of warm amber.

Avoid heavy neon gradients, cyberpunk color overload, and a purely purple-blue technology palette.

### Typography

- Use a modern sans-serif system.
- English display text can be compact and confident.
- Chinese text must remain highly readable.
- Large type should be reserved for the hero and section titles.
- Project metadata should use small technical labels.

### Imagery

Project images should be normalized through consistent treatment:

- Dark or light neutral workbench backgrounds.
- Technical labels for process images.
- Contact-sheet layouts for sketches and model photos.
- Strong final renders or photos when available.

Uneven source material should be presented as design process documentation rather than hidden.

## Interaction and Motion

Motion should create product presence without harming readability.

### Core Effects

- Hero product form slowly rotates, floats, or tilts with pointer movement.
- Project cards reveal tags and contribution details on hover.
- Sections enter with subtle fade and upward movement.
- Process steps highlight progressively on scroll.
- Project details reveal sketches, models, and final views in a sequence.

### Performance Constraint

The first version should use CSS and lightweight JavaScript. If no real 3D model is available, simulate the product object with layered images, CSS shapes, or generated product imagery. Upgrade to Three.js only when an actual model or a strong 3D concept is available.

## Information Architecture

Primary navigation:

- Work
- Process
- About
- Contact

Navigation should remain simple. Recruiters should not need to learn a custom interface.

## Responsive Behavior

Desktop:

- Hero uses a split or layered composition with product visual as the dominant element.
- Featured projects can use a 3-column or staggered layout.
- Case studies can use side notes, metadata rails, and large imagery.

Mobile:

- Hero stacks content and visual.
- Product motion is reduced to gentle automatic motion.
- Project cards become single-column.
- Metadata stays visible without requiring hover.

## Error and Empty States

If a project is missing final imagery, the design should still support it through:

- Process-focused thumbnails.
- Sketch/model grids.
- Clearly labeled concept status.
- Reflection and next-step sections.

Do not pretend incomplete projects are fully launched products.

## Testing and Review Criteria

The site should be reviewed against these checks:

- A recruiter can identify role, direction, and strongest work within 30 seconds.
- Each featured project explains both outcome and process.
- Text remains readable on desktop and mobile.
- Motion does not block scanning or create excessive loading cost.
- Project images and labels feel consistent even when source material varies.
- Contact and resume links are easy to find.

## Out of Scope for First Version

- Full CMS.
- Blog.
- Complex filtering.
- Heavy 3D scenes without real model assets.
- Large multi-page architecture unless project depth requires it later.

## Open Implementation Notes

- Existing workspace contains a lightweight static site: `index.html`, `styles.css`, and `script.js`.
- The first implementation can build on this static structure.
- The local directory is not currently a git repository, so the design document cannot be committed unless git is initialized later.
