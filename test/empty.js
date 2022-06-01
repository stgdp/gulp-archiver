/* eslint-env mocha */
const assert = require( 'assert' )
const gulp = require( 'gulp' )
const gulpZip = require( 'gulp-gzip' )
const gulpTar = require( '..' )

it( 'should not fail on empty directory', ( cb ) => {
    gulp.src( 'fixture/.empty/**/*', {
        cwd: __dirname,
    } )
        .pipe( gulpTar( 'archive.tar', 'tar' ) )
        .pipe( gulpZip() )
        .pipe( gulp.dest( 'dest', {
            cwd: __dirname,
        } ) )
        .on( 'finish', () => {
            cb()
        } )
} )

it( 'should fail on missing filename', () => {
    assert.throws( () => {
        gulpTar()
    }, /`filename` required/ )
} )

it( 'should fail on missing format', () => {
    assert.throws( () => {
        gulpTar( 'archive.tar' )
    }, /`format` required/ )
} )
