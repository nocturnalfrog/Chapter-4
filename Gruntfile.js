'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {};


    config['watch'] = {
        options: {
//            nospawn: true
        },
        coffee: {
            files: ['src/coffee/{,*/}*.coffee'],
            tasks: ['coffee:server']
        },
        compass: {
            files: ['src/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass:server']
        },
        jade: {
            files: ['src/templates/{,*/}*.jade'],
            tasks: ['jade:server']
        }
    };

    config['compass'] = {
        options: {
            sassDir: 'src/styles/sass',
            cssDir: 'src/styles',
            importPath: 'src/bower_components',
            relativeAssets: false
        },
        dist: {},
        server: {}
    };

    config['jade'] = {
        dist: {
            options: {
                pretty: true
            },
            files: {
                'src/index.html': 'src/templates/index.jade'
            }
        },
        server: {
            options: {
                data: {
                    debug: false
                },
                pretty: true
            },
            files: {
                'src/index.html': 'src/templates/index.jade'
            }
        }
    };

    config['coffee'] = {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: 'src/coffee',
                    src: '{,*/}*.coffee',
                    dest: 'dist/scripts',
                    ext: '.js'
                }
            ]
        },
        server: {
            files: [
                {
                    expand: true,
                    cwd: 'src/coffee',
                    src: '{,*/}*.coffee',
                    dest: 'src/scripts',
                    ext: '.js'
                }
            ]
        }
    };

    config['connect'] = {
        server: {
            options: {
                port: 9001,
                base: 'src'
            }
        }
    };

    config['mochaTest'] = {
        src: ['test/bbs.coffee']
    };

    config['clean'] = {
        dist: {
            files: [
                {
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*'
                    ]
                }
            ]
        }
    };

    config['useminPrepare'] = {
        options: {
            dest: 'dist'
        },
        html: 'src/index.html'
    };

    config['usemin'] = {
        options: {
            dirs: ['dist']
        },
        html: ['dist/{,*/}*.html']
    };

    config['htmlmin'] = {
        dist: {
            options: {
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true
            }, files: [
                {
                    expand: true,
                    cwd: 'src',
                    src: '{,*/}*.html',
                    dest: 'dist'
                }
            ]
        }
    };

    config['uglify'] = {
        options: {
            mangle: false
        }
    };

    config['copy'] = {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: 'src/',
                dest: 'dist',
                src: []
            }]
        }
    };

    config['rev'] = {
        dist: {
            files: {
                src: [
                    'dist/scripts/{,*/}*.js',
                ]
            }
        }
    };

    config['cssmin'] = {
        dist: {
            files: {
                'dist/styles/main.css': ['src/styles/{,*/}*.css']
            }
        }
    };


    grunt.initConfig(config);

    var testTasks = [
        'connect',
        'mochaTest'
    ];
    var buildTasks = [
        'test',
        'clean:dist',
        'jade:dist',
        'coffee:dist',
        'compass:dist',
        'useminPrepare',
//        'htmlmin:dist',
        'cssmin:dist',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ];

    grunt.registerTask('test', testTasks);
    grunt.registerTask('build', buildTasks);
};
