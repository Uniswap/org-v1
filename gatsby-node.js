const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

const getSlugParents = slug => {
  const slugParentString = slug.substring(1, slug.length - 1)
  return slugParentString.split('/')
}

exports.onCreateNode = ({ node, getNode, getNodesByType, actions }) => {
  const { createNodeField, createParentChildLink } = actions
  if (node.internal.type === 'Directory') {
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
  // Ensures we are processing only markdown files
  if (node.internal.type === 'Mdx' || node.internal.type === 'Md') {
    console.log(node.fields.slug, node.fields.path)
    const slugParentsArr = getSlugParents(node.fields.slug)

    createNodeField({
      node,
      name: 'topLevelDir',
      value: slugParentsArr[0]
    })

    createNodeField({
      node,
      name: 'subDir',
      value: slugParentsArr.length > 2 ? slugParentsArr[1] : slugParentsArr[0]
    })
  }
}
