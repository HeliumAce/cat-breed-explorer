# Bundled fonts

Served locally, without a font CDN request or extra JavaScript. Both upright WOFF2
files use `font-display: swap` and are preloaded in `index.html`. The family stacks
live in `tailwind.config.ts`; `html` applies the default sans family once, and
controls inherit it through Tailwind's base styles. Display headings opt into
`font-display`; bold text and interface labels keep the sans family.

- **Figtree v9:** Latin variable weight range 400–700 (body, medium controls,
  semibold labels, and bold interface text).
- **Fraunces v38:** Latin variable weight range 500–700 and optical sizes 9–144
  (medium, semibold, and bold display headings). Browser optical sizing remains
  automatic. Softness and wonkiness use the upstream defaults.

No italic faces are needed by the current UI. `font-synthesis: none` prevents
faux bold or italic. System sans and serif fallbacks keep text available if the
font files are delayed or unavailable. These Latin subsets include Western
European accents and punctuation; unsupported scripts use the system fallbacks.

## Sources and licenses

Retrieved from the [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)
on 8 November 2026 using this request with a modern browser user agent:

```text
https://fonts.googleapis.com/css2?family=Figtree:wght@400..700&family=Fraunces:opsz,wght@9..144,500..700&display=swap
```

The files are the unmodified Latin WOFF2 responses:

- [Figtree WOFF2](https://fonts.gstatic.com/s/figtree/v9/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2)
- [Fraunces WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2)

Figtree copyright 2022 The Figtree Project Authors
([upstream](https://github.com/erikdkennedy/figtree)). Fraunces copyright 2018 The
Fraunces Project Authors ([upstream](https://github.com/undercasetype/Fraunces)).
Both are distributed under the SIL Open Font License 1.1. Full copyright and
license notices accompany the files in `Figtree-OFL.txt` and `Fraunces-OFL.txt`,
copied from the corresponding [Google Fonts source directories](https://github.com/google/fonts/tree/main/ofl).
