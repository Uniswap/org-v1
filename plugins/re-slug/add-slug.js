'use strict'

const path = require('path')

const slash = require('slash')

function getDefaultRoots() {
  const cwd = process.cwd()
  const rt = []
  rt.push(path.posix.join(slash(cwd), '/src/content'))
  rt.push(path.posix.join(slash(cwd), '/src/pages'))
  return rt
}

const defaultOptions = {
  types: ['Mdx', 'MarkdownRemark'],
  endsWith: ['Yaml', 'Json'],
  roots: null,
  trailingSlash: true
}

function endsWith(type, suffixes) {
  if (!suffixes) {
    return false
  }

  for (
    var _iterator = suffixes,
      _isArray = Array.isArray(_iterator),
      _i = 0,
      _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
    ;

  ) {
    var _ref

    if (_isArray) {
      if (_i >= _iterator.length) break
      _ref = _iterator[_i++]
    } else {
      _i = _iterator.next()
      if (_i.done) break
      _ref = _i.value
    }

    const suffix = _ref

    if (type.endsWith(suffix)) {
      return true
    }
  }

  return false
}

function findFileNode({ node, getNode }) {
  // Find the file node.
  let fileNode = node
  let whileCount = 0

  while (
    fileNode.internal.type !== `File` &&
    fileNode.parent &&
    getNode(fileNode.parent) !== undefined &&
    whileCount < 101
  ) {
    fileNode = getNode(fileNode.parent)
    whileCount += 1

    if (whileCount > 100) {
      console.log(`It looks like you have a node that's set its parent as itself`, fileNode)
    }
  }

  return fileNode
}

function createFilePath({ fileNode, trailingSlash = true, roots }) {
  // Find the File node
  if (!fileNode) return undefined

  for (
    var _iterator2 = roots,
      _isArray2 = Array.isArray(_iterator2),
      _i2 = 0,
      _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
    ;

  ) {
    var _ref2

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break
      _ref2 = _iterator2[_i2++]
    } else {
      _i2 = _iterator2.next()
      if (_i2.done) break
      _ref2 = _i2.value
    }

    const basePath = _ref2
    const relativePath = path.posix.relative(slash(basePath), slash(fileNode.absolutePath))

    if (relativePath.startsWith('..')) {
      continue
    }

    const _path$parse = path.parse(relativePath),
      _path$parse$dir = _path$parse.dir,
      dir = _path$parse$dir === void 0 ? `` : _path$parse$dir,
      name = _path$parse.name

    const parsedName = name === `index` ? `` : name
    return path.posix.join(`/`, dir, parsedName, trailingSlash ? `/` : ``)
  }

  return undefined
}

let defaultRoots

function match(node, options = defaultOptions) {
  const type = node.internal.type
  return (Array.isArray(options.types) && options.types.indexOf(type) > -1) || endsWith(type, options.endsWith)
}

function addSlug({ context: { node, actions, getNode }, options, api }) {
  const _ref3 = api || module.exports,
    findFileNode = _ref3.findFileNode,
    createFilePath = _ref3.createFilePath,
    getDefaultRoots = _ref3.getDefaultRoots,
    match = _ref3.match

  options = Object.assign({}, defaultOptions, options)

  if (match(node, options)) {
    const roots = options.roots || defaultRoots || (defaultRoots = getDefaultRoots())
    const fileNode = findFileNode({
      node,
      getNode
    })
    const value = createFilePath({
      fileNode,
      roots,
      trailingSlash: options.trailingSlash
    })

    if (value) {
      actions.createNodeField({
        // Name of the field you are adding
        name: 'slug',
        node,
        value: value.replace(/\d+-/g, ``)
      })
      actions.createNodeField({
        // Name of the field you are adding
        name: 'rawSlug',
        node,
        value: value
      })
    }
  }
}

module.exports = {
  addSlug,
  findFileNode,
  createFilePath,
  getDefaultRoots,
  match
}
