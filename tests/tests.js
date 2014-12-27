var assert = require('assert')
var path = require('path')
var fs = require('fs')
var broccoli = require('broccoli')

var Webfont = require('..')

describe('broccoli-webfont', function() {
	var DIR = path.join(__dirname, 'src')
	var builder

	afterEach(function() {
		if (builder) builder.cleanup()
	})

	it('creates webfonts from svg icons', function() {
		var tree = Webfont(DIR)
		builder = new broccoli.Builder(tree)
		return builder.build().then(function(result) {
			var files = fs.readdirSync(result.directory)
			assert(files.indexOf('iconfont.woff') !== -1)
			assert(files.indexOf('iconfont.css') !== -1)
		})
	})

	it('uses glob patterns', function() {
		var tree = Webfont(DIR, {
			files: ['close.svg']
		})
		builder = new broccoli.Builder(tree)
		return builder.build().then(function(result) {
			var css = fs.readFileSync(path.join(result.directory, 'iconfont.css'), 'utf8')
			assert(css.indexOf('.icon-close') !== -1)
			assert(css.indexOf('.icon-back') === -1)
		})
	})

	it('uses dest options as relative', function() {
		var DEST = 'dest'
		var CSS_DEST = 'cssdest/css.css'
		var HTML_DEST = 'htmldest/html.html'

		var tree = Webfont(DIR, {
			dest: DEST,
			cssDest: CSS_DEST,
			htmlDest: HTML_DEST,
			html: true
		})

		builder = new broccoli.Builder(tree)
		return builder.build().then(function(result) {
			var dir = result.directory
			var font = path.join(dir, DEST, 'iconfont.woff')
			var css = path.join(dir, CSS_DEST)
			var html = path.join(dir, HTML_DEST)
			assert(fs.existsSync(font))
			assert(fs.existsSync(css))
			assert(fs.existsSync(html))
		})
	})

})
