"use strict";

const _require = require("./add-slug"),
      addSlug = _require.addSlug;

exports.onCreateNode = function (context, options) {
  addSlug({
    context,
    options
  });
};