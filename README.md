# Nuxtz

Free and open-source [Nuxt 4](https://nuxt.com) boilerplate with Tailwind CSS, Shadcn UI, a local **design-kit Nuxt layer**, Nuxt Icons, dark mode, and Cursor rules.

Live site: [nuxtz.vercel.app](https://nuxtz.vercel.app)

## Get Started

```bash
git clone https://github.com/babakzy/nuxtz.git
cd nuxtz
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## What's Included

- Nuxt 4, Vue 3, TypeScript
- Tailwind CSS & Shadcn UI (Action Blue / parchment tokens from `DESIGN-KIT.md`)
- `layers/design-kit` — reusable `DkButton`, `DkProductTile`, `DkUtilityCard`, and more
- Inter via `@fontsource-variable/inter` (SF Pro substitute per the design kit; `@nuxt/fonts` remains available if you need more families)
- Nuxt Icons, Nuxt Image, VueUse, nuxt-mcp-dev
- Dark mode and Cursor rules / skills

## Design kit layer

Repeatable UI and tokens live in `layers/design-kit`. Nuxt auto-registers anything under `layers/`. Use components like:

```vue
<DkButton variant="primary">Get Started</DkButton>
<DkProductTile tone="dark">...</DkProductTile>
```

See `DESIGN-KIT.md` for the full token and component spec.

## Production

```bash
npm run build
npm run preview
```

See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for more.

## License

Free to use for personal and commercial projects.
