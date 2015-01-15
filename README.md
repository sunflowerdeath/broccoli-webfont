#broccoli-webfont

Broccoli plugin that generates webfonts from SVG icons.

It is wrapper around [webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator).

##Install

```
npm install broccoli-webfont
```

##Usage

```
var webfont = require('broccoli-webfont')

var tree = webfont('inputTree', {
  //paths or globs
  files: [
    'icon.svg',
    'close.svg'
  ]
})
```

##Webfont(inputTree, options)

###inputTree

Broccoli tree with SVG files.

###options

Options are the same as in the
[webfonts-generator](https://github.com/sunflowerdeath/webfonts-generator#list-of-options),
with the following differences:

* `files`, `dest`, `cssDest` and `htmlDest` are relative paths
* `files` supports glob patterns
* `files` default value is `['**/*.svg']`
* `dest` default value is `'.'`
* paths of default templates are in the `webfonts.templates` object.

##License

Public domain, see the `LICENCE.md` file.

