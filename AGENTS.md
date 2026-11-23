# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype-specific design decisions

- Soulpaw Cat cover uses the complete supplied purple/white character poster as `thumb-soulpaw-cat-v2.png`. Preserve all edges with proportional scaling and intrinsic image height (`thumbnailFit: "contain"`); do not apply the shared thumbnail zoom/parallax transform to this cover. Keep its detail artwork unchanged.

- Blitz Bunny IP uses the full original `11.19/Group 2147231109.png` as `detail-blitz-bunny-v2.png`. Its `thumb-blitz-bunny-v2.png` cover comes from the separately supplied black/pink rabbit poster, cropped proportionally to 800x493 with full-bleed coverage and no outer edges or padding. Keep the existing IP entry rather than duplicating it.

- Yulao sea-fishing IP uses the supplied blue-ocean duck-float reference for its cover, with a proportional full-bleed crop that excludes screenshot guides and outer edges; use `thumb-yulao-sea-fishing-v1.png` with the original full-length `detail-yulao-sea-fishing-v1.png` artwork.

- Poetry Adventure and Alpaca Express card covers must fill the entire card with scaled artwork, without the bottom white strip or green padding band. Use `thumb-poetry-adventure-v3.png` and `thumb-alpaca-express-v2.png`.
- Poetry Adventure detail uses `detail-poetry-adventure-v2.png`, cropped from the original at x=190, y=218, width=2560, height=32509 to remove the top pale-yellow blank strip and transparent side margins. Keep the source file intact; generate its matching cover from the cleaned image and fill the card without edge bands.

- BurnWild cover should fill the card edge to edge; proportional scaling and a tighter crop are allowed to remove the next section's bottom white strip. Use `thumb-burnwild-fitness-v2.png`; preserve the full detail artwork.

- Motion direction: use GSAP + ScrollTrigger for a high-end designer portfolio / creative agency feel. Avoid generic fade-ins and cheap bounce. Use full first-screen opening motion, masked title reveals, displacement, compressed return-to-place, staggered card reveals, image mask reveals, and subtle parallax with smooth, restrained easing.
- Secondary-page feature images should fade in as images, not only reveal their parent frame: use delayed opacity, blur, and brightness settling after the container mask opens.
- All content images should use a sliding fade reveal, not a static appearance: hero, work-card thumbnails, listing thumbnails, and secondary-page feature images should enter with opacity, mask, blur/brightness settling, and directional movement.
- Work cards should have a refined selected hover/focus state: soft acid-yellow outline and glow, slight lift, image polish, and no bouncy motion.
- Homepage work-card selected state should match the reference: acid-yellow border/glow wraps the image frame only, while the title turns acid-yellow and the summary stays outside the outline.
- Homepage selected image-frame border must render as a complete closed outline with no missing top edge or rounded corners; draw the hard edge as four explicit lines on the overlay and reserve shadow for glow/overlay.
- Card reveal animation clip-paths must be cleared after entrance completes; persistent parent clip-paths can cut off hover/focus image-frame borders, especially the top edge.
- Classroom and teacher feature images should use the same image reveal language as student work thumbnails: vertical mask reveal, sliding fade, blur/brightness settling, and no sudden pop-in.
- Work detail feature images should use the same smooth reveal as classroom and teacher images: a dedicated image frame with interpolable vertical clip-path, opacity, blur/brightness settling, and no first-frame jump.
- Navigating into any secondary page should land at the top of the page before the entrance motion starts. Feature image frames should open upward from the bottom edge, matching the student-work thumbnail reveal language.
- For long student work detail images, do not reveal by clipping the full image height with percentages. Use a top viewport cover mask that moves upward, so the visible first screen reveals smoothly instead of appearing only at the end.
- Student work detail footer interactions should stay simple and real: use a local persistent like toggle, no recommender list, no report action, no collect action, keep only statement and share. Share should generate the current work URL and copy it when possible.
- The all-works listing page should use a single page-load timeline for heading and cards. Do not stack ScrollTrigger or parallax transforms on this first-viewport grid, because it causes a second pop after the page appears.
- The all-works listing grid should reveal as a grouped grid wave like the homepage, not as slow one-by-one cards. Keep card and image stagger short, with row-level depth rather than individual sequential delays.
- On the all-works listing page, work thumbnails should reveal through the image frame itself: the media frame masks open smoothly from bottom to top, while the card text follows after the image reveal.
- Student work detail pages should use a ZCOOL-style publication layout: title and author/action metadata at the top, followed by a wide work showcase image, concept section, resource slots, and engagement stats instead of the old left-right split detail card.
- Student work detail pages should keep the main site's dark visual system. Use the ZCOOL-style content structure without switching the page, header, buttons, or footer to a white/red ZCOOL color theme.
- Student work assets are stored under `public/assets/students/`: `thumb-*` files are generated 800x493 card thumbnails, and `detail-*` files are the original full-length student work images used on ZCOOL-style detail pages.
- Student work thumbnails should default to a fuller 16:10 top crop. Only thumbnails that visibly expose unwanted section edges or white strips should be slightly tightened, just enough to hide the edge without over-zooming every card.
- If card motion or cover cropping hides important text, adjust only that specific thumbnail with a small safe margin or versioned asset name instead of globally zooming every work card image.
- Homepage UI thumbnails with exposed bottom edge artifacts use targeted cleaned versions: `thumb-urbanist-v5.png`, `thumb-xingyue-fitness-v5.png`, `thumb-guangfu-feiyi-v5.png`, `thumb-living-chess-v6.png`, and `thumb-travel-design-v5.png`.
- Shengcai Cat and MetaWeave UI thumbnails use targeted cleaned crops (`thumb-shengcai-cat-v3.png`, `thumb-metaweave-v2.png`) to remove bottom white strips while preserving cover text.
- Wannadu Planet uses the updated provided artwork as `detail-wannadu-planet-v2.png` and matching cover `thumb-wannadu-planet-v2.png`.
- The three Guangfu culture works are combined into one homepage entry named "广府非遗数字文化作品合集"; use Mianmian's cover and show Mianmian IP, Guangfu Feiyi, and Huanan Kunqu as stacked detail images.
- Homepage works section uses a sliding category module. Put the current uploaded UI batch under "UI课学员作品"; put the provided IP-course long-image works under "IP课学员作品" with the same card, hover, reveal, and detail-page behavior as the UI works.
- Current UI-course works batch uses versioned detail images and regenerated 800x493 thumbnails from the latest provided files: `detail-urbanist-v4.png`, `detail-guangfu-mianmian-v3.png`, `detail-xingyue-fitness-v3.png`, `detail-quda-fashion-v5.png`, `detail-guangfu-feiyi-v4.png`, `detail-huanan-kunqu-v3.png`, `detail-living-chess-v4.png`, `detail-king-brand-v4.png`, `detail-travel-design-v4.png`, and `detail-music-live-v2.png`.
- Additional UI-course works from the `7.6-新增加` batch are appended under "UI课学员作品" with generated 800x493 thumbnails and original long detail images: `detail-ecloud-device-v1.png`, `detail-shengcai-cat-v1.png`, `detail-guke-music-v1.png`, `detail-metaweave-v1.png`, `detail-blue-learning-v1.png`, `detail-play-study-camp-v1.png`, `detail-buzhai-social-v1.png`, `detail-swap-social-v1.png`, `detail-wannadu-planet-v1.png`, and `detail-on-the-road-travel-v1.png`.
- Urbanist detail page uses `detail-urbanist-v4.png`, cropped by 1px on the right from `detail-urbanist-v3.png` to remove the visible right-edge white line only.
- Guangfu Feiyi detail page uses `detail-guangfu-feiyi-v4.png`, copied from the provided `UI作品/新/非遗.png` long image.
- Travel Design detail page uses `detail-travel-design-v4.png`, copied from the provided `UI作品/新/Group 2136643335.png` long image.
- King Brand detail page uses `detail-king-brand-v4.png`, copied from the provided `UI作品/新/Group 2136643336.png` long image.
- Quda Fashion detail page uses `detail-quda-fashion-v5.png`, copied from the provided `UI作品/新/Group 2147230922.png` long image.
- Homepage hero/header visual uses the provided `hero-video-muted.mp4` as an autoplaying muted loop, with `hero-banner.png` kept as the poster fallback.
- All student work displays must be free of added watermark overlays, including UI/IP work-card thumbnails on the homepage and listings, and every detail showcase image (including stacked images). This replaces the earlier shared watermark requirement; keep the original artwork files unchanged.
- Soulpaw Cat IP detail page uses `detail-soulpaw-cat-cropped.png`, a right-edge cropped version of the provided long image to remove the visible white side edge in the detail view.
- Seed Spirit IP detail page uses `detail-seed-spirit-unified.png`, a background-extended version of the provided long image so internal sections keep a consistent visual width without right-side black gaps.
- Homepage works category tabs should be borderless: text tabs with an acid-yellow active underline only, no surrounding container frame.
- Student work detail back navigation should preserve the UI/IP source category: UI works return to the homepage works module with "UI课学员作品" active, and IP works return with "IP课学员作品" active.
- Student work detail back-to-list navigation should land directly on the homepage works module without a visible top-of-home pause or smooth slide-down; use one-time router state/session storage instead of exposing `#works` in the returned URL.
- Sliding containers that contain hover-lift work cards need vertical padding buffers with compensating margins, so card outlines/glow are not clipped by `overflow: hidden`.
- Homepage works slider should clip only the horizontal category panels while allowing vertical hover/focus glow and lifted card surfaces to extend without being cut off.
- Homepage work-card entrance should not apply `clip-path` to the card container itself; use the media/image reveal instead so hover outlines, text, and glow are never masked during or after entrance motion.
- The homepage works-return fast path must not write inline `clip-path` onto `.work-card`, `.work-card__media`, or their images; clear those properties so returning from detail pages matches a fresh homepage load.
- The homepage works-return scroll should be a short one-shot alignment and must cancel on user input; do not keep delayed scroll timers that can pull the page back after the user manually scrolls.
- Student work detail pages should use a pure-white top navigation bar with dark, readable nav text, and the back-to-list control should sit on its own line with clear spacing before the title.
- Student work detail pages should not show a bottom concept/resource-card page after the long work image; use a simple ZCOOL-style bottom with statement, share, and pill tags only.
- Student work detail masthead metadata should only show the work category and copyright; do not show view counts, city, publish-time text, or masthead like/action buttons.
- Student work detail pages should not show like/recommendation buttons in the masthead or bottom footer; keep only statement, share, and tags under the long image.
- Every secondary page navigation should land at the top of the new page, including all listing, detail, classroom, and teacher routes.
- Refreshing or directly opening the homepage must land at the hero/top, even if an old `#works` hash is still in the URL; only the detail-page back-to-list action may consume a one-time flag to scroll the homepage to the works module.
- Student work image edge cleanup should use versioned assets rather than overwriting originals, and only true outer edge artifacts should be trimmed. Do not crop larger white layout areas that are part of the submitted work, and do not resample pixels when trimming.
- Student work detail images should fill the detail showcase width so secondary pages do not show side gutters around the work image. Avoid animation scale/translation inside an overflow-hidden frame so filling the showcase does not read as cropping.
- Student work detail image entrance motion should not scale or translate the image itself inside an overflow-hidden frame, because that reads as cropping. Use mask, opacity, blur, and brightness settling instead.
- Returning from a work detail page to the homepage works anchor should land directly on the works module without a top-first scroll or replaying the full homepage intro timeline.
- MINTY ROAR uses the supplied full-length artwork as its detail image and the separately supplied blue-sky, cube-and-character image as its cover. Crop/scale that cover to fill the card edge to edge without padding or visible outer image edges; retain the character's face as the focal point.
- Giraffe / 鹿高高 is one IP work placed immediately before Tomato Bear. Show the supplied `642.png` then `643.png` as two ordered detail images, and use the separate carousel scene as its cover.

- KOWBOY coffee IP is one work immediately before Tomato Bear: use the supplied blue-sky cow cover and show detail-kowboy-coffee-01-v1.png then detail-kowboy-coffee-02-v1.png in order.
