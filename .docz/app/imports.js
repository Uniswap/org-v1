export const imports = {
  'README 2.md': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "readme-2" */ 'README 2.md'
    ),
  'docs/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-button" */ 'docs/Button.mdx'
    ),
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
}
