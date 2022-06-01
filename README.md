# @stgdp/gulp-archiver
## Adapted from [gulp-tar](https://github.com/sindresorhus/gulp-tar)
> Create archives from files


## Install

```
$ npm install --save-dev @stgdp/gulp-archiver
```


## Usage

```js
const gulp = require( 'gulp' )
const archiver = require( '@stgdp/gulp-archiver' )
const gzip = require( 'gulp-gzip' )

exports.default = () => (
	gulp.src( 'src/*' )
		.pipe( archiver( 'archive.tar' ) )
		.pipe( gzip() )
		.pipe( gulp.dest( 'dist' ) )
)
```


## API

### archiver(filename, format, options?)

#### filename

Type: `string`

Filename for the output archive.

#### format

Type: `string`

Format for the output tar archive. Can be `zip`, `tar` or `json`

#### options

Type: `object`

Default options passed to [Archiver](https://github.com/archiverjs/node-archiver)'s [constructor](https://archiverjs.com/docs/Archiver.html) and merged into the [data](https://archiverjs.com/docs/global.html#TarEntryData) passed to its [`append`](https://archiverjs.com/docs/Archiver.html#append) method.
