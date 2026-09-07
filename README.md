# Tom-ME · Fieldbook

This branch contains the standalone Fieldbook portfolio template, extracted from
`template-lab` at `ea868f3`. The home page renders Fieldbook directly, with its
portrait and mascot cycling, timeline, projects, publications, and photo albums.

The original two-template prototype remains on `template-lab`. Continue Fieldbook
development on the `fieldbook` branch in this worktree.

## Local development

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

## Validation

```sh
npx tsc --noEmit --incremental false
npm run build
npm run build:pages
```

## GitHub Pages

`npm run build:pages` uses Next.js to export the site into `out/`, including
HTML, CSS, JavaScript, images, and the resume PDF. No Node.js server is needed
for this output. The existing Vinext development/build commands remain available.
Builds download the Geist fonts, so an internet connection is required.

To inspect the exported site locally, run `python3 -m http.server 8080 --directory out`
and open http://localhost:8080. Check the layout, portrait/mascot buttons,
photo albums, and resume download before publishing.

The GitHub Actions workflow builds pushes to `fieldbook` and `master`, and pull
requests targeting `master`. Only a `master` push or manual run on `master` can
deploy; a `fieldbook` build uploads an artifact without updating the live site.

When ready to publish:

1. In the repository's Settings > Pages, select **GitHub Actions** as the source.
2. If the `github-pages` environment restricts branches, allow `master`.
3. From the original checkout, fetch and update `master`, then merge `fieldbook`
   using `git merge --ff-only fieldbook` and push `master`.
4. Wait for both workflow jobs to succeed and inspect https://jesusmicah.github.io/.

Keep `legacy-site` for the previous website. The Pages site is served at the
account domain root, so no repository-name `basePath` is configured.
