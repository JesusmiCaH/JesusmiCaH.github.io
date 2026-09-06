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
```

The existing Sites/Vinext configuration is retained. Creating this branch does
not publish a site or push the branch to a remote.
