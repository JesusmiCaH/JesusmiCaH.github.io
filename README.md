# Urbanview

A bold editorial portfolio template with a research timeline, selected projects, publication records, and a keyboard-accessible photo archive. Built with React, TypeScript, and Vinext, with the existing Sites / Cloudflare build configuration.

This branch is the standalone Urbanview template. Fieldbook is maintained separately. The default content remains Chenghao “Tommy” Jiang’s personal portfolio, as an example of a complete configuration.

## Run locally

Requires Node.js 22.13+ and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by the server. All commands run from the project root.

## Customize

Edit `content/site.ts` to replace the content without changing page components:

| Export | Purpose |
| --- | --- |
| `site` | Page metadata, English/Chinese name, brand, roles, biography, headline, contact link |
| `portraits`, `portraitOrder` | Portrait files, crop positions, and cycling order |
| `contactLinks` | Location, email, social profiles, and resume |
| `organizations` | Timeline entries, logos, dates, and expandable details |
| `featuredProjects` | Numbered exhibition posters; optional `image`/`imageAlt` or `coverLines`/`coverKicker` for a typographic cover |
| `publications` | Publication dates, authors, abstracts, images, and links |
| `photoStories` | Album groups, color, descriptions, and photos |

Keep at least one portrait, and at least one photo in each album. IDs must be unique. Portrait and album counts are computed from the configuration. Project cards are generated from the array, so their count is not fixed at two. The timeline, projects, and publications can be empty; add records when ready. Keep the four album colors `violet`, `red`, `blue`, and `orange` or add a matching CSS variant.

The two `preview: true` publication records are explicitly labeled design samples. They are not claims of published work. Keep that label until replacing them with a real public record.

Put media in `public/` and reference it with paths starting with `/`, such as `/images/portraits/my-photo.jpg`. Replace the resume PDF, organization marks, paper figures, favicon, and contact destinations when adapting the template. See `ASSETS.md` for the retained assets and reuse boundaries.

Edit shared colors in `:root` in `app/globals.css`. The `--urban-yellow` and `--urban-blue` tokens also style the album dialog. Edit the section UI copy and layout in `components/urbanview/urbanview.tsx`; the timeline, papers, and album viewer have their own components. Google fonts are configured in `app/layout.tsx`.

## Validate and package

```sh
npm run check
npm run build
npm run start
```

`check` validates content IDs, album covers, local asset paths and link schemes, then runs TypeScript and ESLint. It does not verify the current availability of external websites.

```sh
npm run package:template
```

Packaging runs validation and a production build, then writes `releases/urbanview-0.1.0.tar.gz`. The archive contains source and the retained personal assets. It excludes Git history, credentials, environment files, dependency folders, compiled output, local PDF drafts, and design working files. Its Sites manifest is reset so a recipient cannot inherit an existing site registration. Extract it, run `npm ci`, and customize the configuration.

## Deployment

`npm run build` produces the existing Cloudflare Worker and client assets under `dist/`. This is a server-backed Vinext project; the source archive or `dist/client` alone is not a GitHub Pages deployment. Publishing requires a compatible Worker deployment or Sites registration. `.openai/hosting.json` currently contains only empty bindings; no hosted site is registered by this template refactor.

Treat this as a prepared template source, not an already-published release. Choose the distribution license and replace or obtain permission for retained personal/third-party assets before offering a general-purpose public template. No license grant is added by this structural refactor.

## Visual system

The shared type scale is defined at the end of `app/globals.css`: Geist Sans for reading and headlines, Geist Mono for dates and exhibit metadata. Regular labels are 14px, body copy is 16–18px. Experience and publication records share `timeline-date.tsx` and the `record-*` styles; experience includes a quieter start label and node. Contacts use a responsive directory with pixel pictograms.

Selected output is a native horizontal poster exhibition with touch/trackpad scrolling, keyboard arrows, and previous/next buttons. Add records to `featuredProjects`; project counts and navigation limits adapt automatically. Project cover text is configurable, and each poster remains a normal external link.

Character artwork remains at the proposal stage. Three directions and placement notes are recorded in `design/urbanview/art-direction.md` in the repository; that working design document is excluded from the source archive.
