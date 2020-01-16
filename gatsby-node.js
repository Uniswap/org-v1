const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

const getSlugParents = slug => {
  const slugParentString = slug.substring(1, slug.length - 1)
  return slugParentString.split('/')
}

exports.onCreateNode = ({ node, getNode, getNodesByType, actions }) => {
  const { createNodeField, createParentChildLink } = actions

  if (node.internal.type === 'Directory') {
    if (node.sourceInstanceName === 'docs') {
      // in some case the trailing slash is missing.
      // Always add it and normalize the path to remove duplication
      const parentDirectory = path.normalize(node.dir + '/')
      const parent = getNodesByType('Directory').find(
        n => path.normalize(n.absolutePath + '/') === parentDirectory
      )
      if (parent) {
        node.parent = parent.id
        createParentChildLink({
          child: node,
          parent: parent
        })
      }
    } else if (node.sourceInstanceName === 'guides') {
      // in some case the trailing slash is missing.
      // Always add it and normalize the path to remove duplication
      const parentDirectory = path.normalize(node.dir + '/')
      const parent = getNodesByType('Directory').find(
        n => path.normalize(n.absolutePath + '/') === parentDirectory
      )
      if (parent) {
        node.parent = parent.id
        createParentChildLink({
          child: node,
          parent: parent
        })
      }
    }
  }
  // Ensures we are processing only markdown files
  if (node.internal.type === 'Mdx') {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages'
    })
    const slugParentsArr = getSlugParents(slug)

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    createNodeField({
      node,
      name: 'topLevelDir',
      value: slugParentsArr[0]
    })

    createNodeField({
      node,
      name: 'subDir',
      value: slugParentsArr.length > 2 ? slugParentsArr[1] : ''
    })
  }
}
