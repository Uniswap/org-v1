const v2DocsQuery = `{
  allMdx(filter: {fileAbsolutePath: {regex: "/docs/v2/"}}) {
    nodes {
      id
      frontmatter {
        title
        tags
      }
      fields {
        slug
        parentDir
        subDir
        topLevelDir
        rawSlug
      }
      excerpt
      headings {
        value
      }
    }
  }
}
`

// const settings = { attributesToSnippet: [`excerpt:20`] }

const handleRawBody = rawBody => {
  // We want to split `rawBody` from the node

  // To improve search with smaller record sizes, we will divide all
  // blog posts into sections (essentially by paragraph).

  // Since the body of my posts is markdown, we will split
  // whereever there are two adjacent new lines, this is a
  // reasonable proxy for paragraphs
  const sections = rawBody.split(`\n`)

  // Now, we're goint to map over each section, returning
  // an object that contains all the frontmatter and excerpt,
  // but only has the specific content on that key.
  // This way the results are still associated with the
  // correct post.
  return sections
}

const queries = [
  {
    query: v2DocsQuery,
    transformer: ({ data }) =>
      data.allMdx.nodes.map(node => ({
        objectID: node.id,
        path: node.fields.slug,
        title: node.frontmatter.title,
        parentDir: node.fields.parentDir,
        headings: node.headings,
        tags: node.frontmatter.tags,
        excerpt: handleRawBody(node.excerpt)
      })),
    indexName: `V2Docs`
    // settings
  }
]
module.exports = queries

// const title = node.name
//     .replace(/\d+-/g, '')
//     .replace(/-/g, ' ')
//     .replace(/(^|\s)\S/g, function(t) {
//       return t.toUpperCase()
//     })

// const mdxQuery = `
// {
//   allMdx(filter: {fileAbsolutePath: {regex: "/docs/v2/"}}) {
//     edges {
//       node {
//         excerpt
//         frontmatter {
//           tags
//           title
//         }
//         rawBody
//       }
//     }
//   }
// }
// `

// const unnestFrontmatter = node => {
//   const { frontmatter, ...rest } = node

//   return {
//     ...frontmatter,
//     ...rest
//   }
// }

// const handleRawBody = node => {
//   // We want to split `rawBody` from the node
//   const { rawBody, ...rest } = node

//   // To improve search with smaller record sizes, we will divide all
//   // blog posts into sections (essentially by paragraph).

//   // Since the body of my posts is markdown, we will split
//   // whereever there are two adjacent new lines, this is a
//   // reasonable proxy for paragraphs
//   const sections = rawBody.split('\n')

//   // Now, we're goint to map over each section, returning
//   // an object that contains all the frontmatter and excerpt,
//   // but only has the specific content on that key.
//   // This way the results are still associated with the
//   // correct post.
//   const records = sections.map(section => ({
//     ...rest,
//     content: section
//   }))

//   return records
// }

// const queries = [
//   {
//     query: mdxQuery,
//     transformer: ({ data }) =>
//       data.allMdx.edges
//         .map(edge => edge.node)
//         .map(unnestFrontmatter)
//         // Now we take rawBody and manipulate it into many more records
//         .map(handleRawBody)
//     // And we flatten those records into a single array
//     // alternatively, flatMap is available wherever ES2019 is implemented
//     // .reduce((acc, cur) => [...acc, ...cur], [])
//   }
// ]

// module.exports = queries
