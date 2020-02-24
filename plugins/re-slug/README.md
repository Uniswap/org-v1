# gatsby-plugin-relative

The relative plugin adds a *slug* field (URI) to Gatsby file nodes of an appropriate type (by default to Yaml, JSON, Mdx and MarkdownRemark nodes). The value of the slug is the path relative to the first matching directory in the list of root directories (defaults to *src/content* and *src/pages*). A file extension is removed, an optional, configurable trailing slash is added. An *index* file name is omitted. For example, an *src/content/posts/example.md* file will have the */posts/example/* slug, and a *src/content/posts/index.md* file will have the */posts/* slug. The slug field could be used to actually create pages, or, just for convenience, it could be used in GraphQL queries (see, for example, [gatsby-plugin-combine](https://github.com/act-labs/gatsby-plugin-combine)).


## Install

`npm install --save gatsby-plugin-relative`

## Configuration options

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-relative`,
    options: {
        types: ["Mdx", "MarkdownRemark"], // file types to add slugs to
        endsWith: ["Yaml"], // will match file types ending with "Yaml", e.g., LettersYaml or SnippetsYaml
        roots: ["/dir1/subdir1", "/dir2/subdir2"], // a list of directories relative to which slugs are calculated (defaults to *src/content* and *src/pages*)
        trailingSlash: true // an optional trailing slash
    },
  },
]
```

## Later query using GraphQL

```graphql
{
  allLettersYaml {
    edges {
      node {
        fields {
            slug
        }
      }
    }
  }
}
```
