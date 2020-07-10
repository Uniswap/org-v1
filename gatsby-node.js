const path = require('path')

function getSlugPath(slug) {
  return slug.slice(1, slug.length - 1).split('/')
}

exports.onCreateNode = ({ node, getNodesByType, actions }) => {
  const { createNodeField, createParentChildLink } = actions
  if (node.internal.type === 'Directory') {
    // in some case the trailing slash is missing.
    // Always add it and normalize the path to remove duplication
    const parentDirectory = path.normalize(node.dir + '/')
    const parent = getNodesByType('Directory').find(n => path.normalize(n.absolutePath + '/') === parentDirectory)
    if (parent) {
      node.parent = parent.id
      createParentChildLink({
        child: node,
        parent
      })
    }
  }
  // Ensures we are processing only markdown files
  if (node.internal.type === 'Mdx' || node.internal.type === 'Md') {
    const slugPath = getSlugPath(node.fields.slug)
    createNodeField({
      node,
      name: 'topLevelDir',
      value: slugPath[0]
    })

    createNodeField({
      node,
      name: 'parentDir',
      value: slugPath ? slugPath[2] : ' '
    })

    createNodeField({
      node,
      name: 'subDir',
      value: slugPath[slugPath.length - 1]
    })
  }
}
