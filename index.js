'use strict'
const path = require( 'path' )
const through = require( 'through2' )
const archiver = require( 'archiver' )
const Vinyl = require( 'vinyl' )

module.exports = ( filename, format, options ) => {
    if ( !filename ) {
        throw new Error( '`filename` required' )
    }

    if ( !format ) {
        throw new Error( '`format` required' )
    }

    let firstFile
    const archive = archiver( format, options )

    return through.obj( ( file, enc, cb ) => {
        if ( file.path.includes( 'node_modules' ) ) {
            cb()
            return
        }

        if ( file.relative === '' ) {
            cb()
            return
        }

        if ( firstFile === undefined ) {
            firstFile = file
        }

        const nameNormalized = file.relative.replace( /\\/g, '/' )

        if ( file.isSymbolic() ) {
            archive.symlink( nameNormalized, file.symlink )
        } else {
            archive.append( file.contents, {
                name: nameNormalized + ( file.isNull() ? '/' : '' ),
                mode: file.stat && file.stat.mode,
                date: file.stat && file.stat.mtime ? file.stat.mtime : null,
                ...options,
            } )
        }

        cb()
    }, function( cb ) {
        if ( firstFile === undefined ) {
            cb()
            return
        }

        archive.finalize()

        this.push( new Vinyl( {
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: path.join( firstFile.base, filename ),
            contents: archive,
        } ) )

        cb()
    } )
}
