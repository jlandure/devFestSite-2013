module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    // Paramétrage

    src: {
      html: {
        index:    'index.html',
        partials: 'partials',
        all :     "**/*.html"
      },
      js:   ['js/**/*.js'],
      css: {
        all :'css/**/*.css',
        dir: 'css/',
        app: 'css/devfest.css'
      },
      assets: {
        font:     'font',
        images:   'images',
        json:     'json',
        manifest: 'devfest_appcache.manifest',
        sitemap:  'sitemap.xml',
        robots:   'robots.txt'
      }
    },
    
    dest: {
      root:       'prod',
      html: {
        index:    'prod/index.html',
        partials: 'prod/partials'
      },
      assets: {
        font:     'prod/font',
        images:   'prod/images',
        json:     'prod/json',
        manifest: 'prod/devfest_appcache.manifest',
        sitemap:  'prod/sitemap.xml',
        robots:   'prod/robots.txt'
      }
    },

    // Configuration des taches

    clean: {
      prod:   '<%= dest.root %>'
    },

    copy: {
      html: {
        files: [
          { src: '<%= src.html.index %>', dest: '<%= dest.html.index %>' },
          { expand: true, cwd: '<%= src.html.partials %>', src: ['**/*.html'], dest: '<%= dest.html.partials %>' }
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: '<%= src.assets.font %>', src: ['**'], dest: '<%= dest.assets.font %>' },
          { expand: true, cwd: '<%= src.assets.images %>', src: ['**'], dest: '<%= dest.assets.images %>' }, // (ne copier que les images non spritees)
          { expand: true, cwd: '<%= src.assets.json %>', src: ['**/*.json'], dest: '<%= dest.assets.json %>' },
          { src: '<%= src.assets.manifest %>', dest: '<%= dest.assets.manifest %>' },
          { src: '<%= src.assets.sitemap %>', dest: '<%= dest.assets.sitemap %>' },
          { src: '<%= src.assets.robots %>', dest: '<%= dest.assets.robots %>' }
        ]
      }
    },

    /* Config auto des taches concat, uglify et cssmin */
    useminPrepare: {
      html: '<%= dest.html.index %>'
    },

    usemin: {
      html: ['<%= dest.html.index %>'],
      options: {
        dirs: ['<%= dest.root %>']
      }
    },
/*
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= src.js %>'],
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: '<%= src.css.app %>'
    },*/

    // Configuration du watch

    watch: {
      html: {
        files: ['<%= src.html.all %>'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['<%= src.css.all %>'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= src.js %>'],
        options: {
          livereload: true
        }
      }
    },

    oversprite: {
        all: {
            spritelist: [
                {
                    // List of images to add to sprite
                    'src': ['images/team/sprite/*.png'],
                    // Address of target image
                    'dest': 'prod/images/sprites/team-sprite.png',
                    // OPTIONAL: Image placing algorithm: top-down, left-right, diagonal, alt-diagonal
                    'algorithm': 'top-down',
                    // OPTIONAL: Rendering engine: auto, canvas, gm
                    'engine': 'gm',
                    // OPTIONAL: Preferences for resulting image
                    'exportOpts': {
                        // Image formst (buy default will try to use dest extension)
                        'format': 'png',
                        // Quality of image (gm only)
                        'quality': 90
                    }
                }
            ],
            csslist: [
                {
                    'src':  'prod/css/app.css',
                    // Target css file, can be the same as source
                    'dest': 'prod/css/app-x.css'
                    // OPTIONAL: Normalization string. Will be added to css dir path, before paths in css. 
                    // Use if you move the css and paths to images aren't resolving correctly now.
                    //'base': ''
                }
            ]
        }
    }


  });

  // Chargement des plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  /*grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');*/
  grunt.loadNpmTasks('grunt-contrib-watch');
  /*grunt.loadNpmTasks('grunt-contrib-compass');**/
  grunt.loadNpmTasks('grunt-oversprite');

  // Déclaration des taches
  /*grunt.registerTask('lint',    ['jshint', 'csslint']);*/
  grunt.registerTask('prod',    ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'oversprite', 'usemin']);
  grunt.registerTask('default', ['prod']);

};
