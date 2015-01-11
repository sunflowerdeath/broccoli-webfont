var path = require('path')
var _ = require('underscore')
var Q = require('q')
var CachingWriter = require('broccoli-glob-caching-writer')
var webfontsGenerator = require('webfonts-generator')

function Webfont(inputTree, options) {
	if (!options) options = {}
	if (!options.files) options.files = ['**/*.svg']
	if (!(this instanceof Webfont)) return new Webfont(inputTree, options)
	CachingWriter.apply(this, arguments)
}

Webfont.prototype = Object.create(CachingWriter.prototype)

/** Generates webfonts in the 'destDir'. */
Webfont.prototype.updateCache = function(srcDir, destDir, files) {
	if (!files.length) return

	var webfontsOptions = _.extend({}, this.options)
	_.each(['dest', 'cssDest', 'htmlDest'], function(option) {
		var value = this.options[option]
		if (value !== undefined) webfontsOptions[option] = path.join(destDir, value)
	}, this)
	webfontsOptions.files = _.map(files, function(file) {
	 return path.join(srcDir, file)
	})
	if (webfontsOptions.dest === undefined) webfontsOptions.dest = destDir

	return Q.nfcall(webfontsGenerator, webfontsOptions)
}

module.exports = Webfont
