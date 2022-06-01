/* eslint-env mocha */
const fs = require( 'fs' )
const path = require( 'path' )
const zlib = require( 'zlib' )
const assert = require( 'assert' )
const gulp = require( 'gulp' )
const gulpZip = require( 'gulp-gzip' )
const tarfs = require( 'tar-fs' )
const rimraf = require( 'rimraf' )
const gulpTar = require( '..' )

it( 'should include directories', ( cb ) => {
    const onTargz = () => {
        const filename = 'archive.tar.gz'
        const fullPath = path.join( __dirname, 'dest', filename )
        const rs = fs.createReadStream( fullPath )

        rs.pipe( zlib.createGunzip() )
            .pipe(
                tarfs.extract( path.join( __dirname, 'dest-out' ), {
                    mapStream( filestream, header ) {
                        const expected = expectedNames.pop()
                        assert.strictEqual( header.name, expected )
                        return filestream
                    },
                } )
            )
            .on( 'finish', () => {
                // eslint-disable-next-line comma-dangle
                for ( const directory of ['dest', 'dest-out'] ) {
                    rimraf.sync( path.join( __dirname, directory ) )
                }

                cb()
            } )
    }

    const expectedNames = [
        'dir-fixture/inside.txt',
        'fixture.txt',
    ]

    gulp.src( 'fixture/**/*', {
        cwd: __dirname,
    } )
        .pipe( gulpTar( 'archive.tar', 'tar' ) )
        .pipe( gulpZip() )
        .pipe( gulp.dest( 'dest', {
            cwd: __dirname,
        } ) )
        .on( 'finish', onTargz )
} )
